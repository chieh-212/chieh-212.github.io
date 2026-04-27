---
title: "pwnable.tw_calc_writeup"
description: "challenge: calc"
pubDate: 2026-04-03
heroImage: "../../assets/blog-placeholder-1.jpg"
---
## calc
##### discription: Have you ever use Microsoft calculator?
*This write-up is not completed
#### 觀察跟思路
1. Used checksec and found that NX is open
##### checksec
```
$ checksec calc
[*] '/home/chiehhhhh/pwnable_tw/calc'
    Arch:       i386-32-little
    RELRO:      Partial RELRO
    Stack:      Canary found
    NX:         NX enabled
    PIE:        No PIE (0x8048000)
    Stripped:   No
```
2. Used IDA to disassemble some important functions like main, calc and get_expr
##### main
```
int __cdecl main(int argc, const char **argv, const char **envp)
{
  _bsd_signal(14, timeout);
  alarm(60);
  IO_puts("=== Welcome to SECPROG calculator ===");
  IO_fflush(stdout);
  calc();
  return IO_puts("Merry Christmas!");
}
```
分析：問題不大，`calc`比較重要

##### calc
```
unsigned int calc()
{
  _DWORD v1[101]; // [esp+18h] [ebp-5A0h] BYREF
  _BYTE s[1024]; // [esp+1ACh] [ebp-40Ch] BYREF
  unsigned int v3; // [esp+5ACh] [ebp-Ch]

  v3 = __readgsdword(0x14u);
  while ( 1 )
  {
    __bzero(s, 0x400u);
    if ( !get_expr(s, 1024) )
      break;
    init_pool(v1);
    if ( parse_expr(s, v1) )
    {
      _printf("%d\n", v1[v1[0]]);
      IO_fflush(stdout);
    }
  }
  return __readgsdword(0x14u) ^ v3;
}
```
分析：每次計算前都會用bzero把整個陣列清零，再來就是把其它看起來有趣的函數翻一翻
##### get_expr
```
int __cdecl get_expr(int a1, int a2)
{
  int v2; // eax
  char v4; // [esp+1Bh] [ebp-Dh] BYREF
  int v5; // [esp+1Ch] [ebp-Ch]

  v5 = 0;
  while ( v5 < a2 && _libc_read(0, &v4, 1) != -1 && v4 != 10 )
  {
    if ( v4 == 43 || v4 == 45 || v4 == 42 || v4 == 47 || v4 == 37 || v4 > 47 && v4 <= 57 )
    {
      v2 = v5++;
      *(_BYTE *)(a1 + v2) = v4;
    }
  }
  *(_BYTE *)(v5 + a1) = 0;
  return v5;
}
```
這是原汁原味IDA逆向出來的東西，可以看到ASCII直接變回數字了，所以整理一下比較好分析
```
int __cdecl get_expr(int a1, int a2)
{
  int v2; // eax
  char v4; // [esp+1Bh] [ebp-Dh] BYREF
  int v5; // [esp+1Ch] [ebp-Ch]

  v5 = 0;
  while ( v5 < a2 && _libc_read(0, &v4, 1) != -1 && v4 != '\n' )
  {
    if ( v4 == '+' || v4 == '-' || v4 == '*' || v4 == '/' || v4 == '%' || v4 > '/' && v4 <= '9' )
    {
      v2 = v5++;
      *(_BYTE *)(a1 + v2) = v4;
    }
  }
  *(_BYTE *)(v5 + a1) = 0;
  return v5;
}
```
透過函數名稱可以知道這大概是讀取輸入跟判斷輸入的東西是不是運算子跟數字，是的話就就存到v4裡，然後最後把v5 aka user_input輸入的字串長度回傳，到這裡還是看不太出所以然，下面一位
##### init_poor
```
_DWORD *__cdecl init_pool(_DWORD *a1)
{
  _DWORD *result; // eax
  int i; // [esp+Ch] [ebp-4h]

  result = a1;
  *a1 = 0;
  for ( i = 0; i <= 99; ++i )
  {
    result = a1;
    a1[i + 1] = 0;
  }
  return result;
}
```
分析：指標後100位都變0
##### parse_expr
這個有點大串就拆一下
```
int __cdecl parse_expr(int a1, _DWORD *a2)
{
  int v3; // eax
  int v4; // [esp+20h] [ebp-88h]
  int i; // [esp+24h] [ebp-84h]
  int v6; // [esp+28h] [ebp-80h]
  int v7; // [esp+2Ch] [ebp-7Ch]
  char *s1; // [esp+30h] [ebp-78h]
  int v9; // [esp+34h] [ebp-74h]
  _BYTE s[100]; // [esp+38h] [ebp-70h] BYREF
  unsigned int v11; // [esp+9Ch] [ebp-Ch]

  v11 = __readgsdword(0x14u);
  v4 = a1;
  v6 = 0;
```
問題不大，就是宣告跟初始化
```
  __bzero(s, 0x64u);
  for ( i = 0; ; ++i )
  {
    if ( (unsigned int)(*(char *)(i + a1) - 48) > 9 )
    {
      v7 = i + a1 - v4;
      s1 = (char *)malloc(v7 + 1);
      memcpy(s1, v4, v7);
      s1[v7] = 0;
      if ( !strcmp(s1, "0") )
      {
        IO_puts("prevent division by zero");
        IO_fflush(stdout);
        return 0;
      }
```
分析：  
首先可以觀察到它先把s清空了，然後判斷輸入的字串是否非0\~9，是的話就存進陣列裡，並運用`memcpy`把那個非0\~9前的字串們丟進s1  
如果s1=='0'就輸出prevent division by zero&離開函式  
`malloc` : 動態配置記憶體  
`memcpy` : 總之是複製字串，可以參考這篇[文章](https://www.ibm.com/docs/zh-tw/i/7.5.0?topic=functions-memcpy-copy-bytes)  
`strcmp` : 字串比對，一樣就回傳0；剩下就是如果str1>str2就回傳>0的數字，反之亦然

```
      v9 = atoi(s1);
      if ( v9 > 0 )
      {
        v3 = (*a2)++;
        a2[v3 + 1] = v9;
      }
      if ( *(_BYTE *)(i + a1) && (unsigned int)(*(char *)(i + 1 + a1) - 48) > 9 )
      {
        IO_puts("expression error!");
        IO_fflush(stdout);
        return 0;
      }
      v4 = i + 1 + a1;
```
分析：  
首先把atoi一下s1，然後存到v9裡  
如果v9>0，就把a2[0]存進v3，再把v9存進a2[a2[0]+1]  
`atoi` : 除了sign跟num以外的部分過濾掉
```
      if ( s[v6] )
      {
        switch ( *(_BYTE *)(i + a1) )
        {
          case '%':
          case '*':
          case '/':
            if ( s[v6] != '+' && s[v6] != '-' )
              goto LABEL_14;
            s[++v6] = *(_BYTE *)(i + a1);
            break;
          case '+':
          case '-':
LABEL_14:
            eval(a2, (char)s[v6]);
            s[v6] = *(_BYTE *)(i + a1);
            break;
          default:
            eval(a2, (char)s[v6--]);
            break;
        }
      }
      else
      {
        s[v6] = *(_BYTE *)(i + a1);
      }
      if ( !*(_BYTE *)(i + a1) )
        break;
    }
  }
  while ( v6 >= 0 )
    eval(a2, (char)s[v6--]);
  return 1;
}
```
總之就是優先運算的部分，剩下要注意的是eval
##### eval
```
_DWORD *__cdecl eval(_DWORD *a1, char a2)
{
  if ( a2 == '+' )
  {
    a1[*a1 - 1] += a1[*a1];
  }
  else if ( a2 > '+' )
  {
    if ( a2 == '-' )
    {
      a1[*a1 - 1] -= a1[*a1];
    }
    else if ( a2 == '/' )
    {
      a1[*a1 - 1] /= (int)a1[*a1];
    }
  }
  else if ( a2 == '*' )
  {
    a1[*a1 - 1] *= a1[*a1];
  }
  --*a1;
  return a1;
}
```
看起來就是運算部份而已

3. Calculated the offset
4. Structed a ROPchain
5. found the flag
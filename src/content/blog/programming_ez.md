---
title: "ez problem practice"
description: "practice some classic programming problems"
pubDate: 2026-07-01
heroImage: "../../assets/blog-placeholder-1.jpg"
---
註：不是我覺得ez...
## 數字龍捲風
#### 思路
總之就是先找中間，因為陣列輸入從0開始=>中間index=N*N/2  
case D=0(即往左) => index-=1;  
case D=1(即往上) => index-=N;  
case D=2(即往右) => index+=1;  
case D=3(即往下) => index-=N;  
跟一下龍捲風跑到的位置就可以知道移動幾個數字是有規律的：1、1、2、2、3、3、......、N-1、N-1、**N-1**  
也可以知道總共讀的次數是2N-1，轉向的次數是2N-2  
至於為什麼最後三個都是N-1，因為第三個N-1本來應該是N，但移到第N個數字會發現沒數字可以讀了  
##### solve.cpp
```
#include<iostream>
#include<string>
using namespace std;

int main(){
    int N;cin>>N;
    int Direction;cin>>Direction;
    int num[2401] = {0};
    int j;
    for(int i=0; i<N*N;i++){
        cin>>num[i];
    }
    string str = "";
    int index=N*N/2;
    str+=to_string(num[index]);
    for (int i=0; i<(2*N-2); i++){
        j=((i/2)+1);
        switch(Direction){
            case 0:
                while(j--){
                    str+=to_string(num[index-1]);
                    index-=1;
                }
                Direction+=1;
                break;
            case 1:
                while(j--){
                    str+=to_string(num[index-N]);
                    index-=N;
                }
                Direction+=1;
                break;
            case 2:
                while(j--){
                    str+=to_string(num[index+1]);
                    index+=1;
                }
                Direction+=1;
                break;
            case 3:
                while(j--){
                    str+=to_string(num[index+N]);
                    index+=N;
                }
                Direction=0;
                break;
        }
    }
    j=(N-1);
    switch(Direction){
        case 0:
            while(j--){
                str+=to_string(num[index-1]);
                index-=1;
            }
            break;
        case 1:
            while(j--){
                str+=to_string(num[index-N]);
                index-=N;
            }
            break;
        case 2:
            while(j--){
                str+=to_string(num[index+1]);
                index+=1;
            }
            break;
        case 3:
            while(j--){
                str+=to_string(num[index+N]);
                index+=N;
            }
            break;
    }
    cout<<str<<"\n";
    return 0;
}
```
## 線段覆蓋長度
#### 思路
開陣列暴力掃(X)  
我的想法是讀完各線段的起始跟結束，最後去結合可以連一起的線段  
不過資結超爛的我用陣列硬幹失敗了，上網找才想到pair  
##### solve.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int N;cin>>N;
    pair<int, int> line[N];
    int count=0;
    for(int i=0; i<N; i++){
        cin>>line[i].first>>line[i].second;
    }
    sort(line, line+N);
    for(int i=1; i<N; i++){
        if(line[i].first<=line[0].second&&line[i].second>line[0].second){
            line[0].second = line[i].second;
        }
        else if(line[i].first<=line[0].second){
            continue;
        }
        else{
            count+=line[0].second-line[0].first;
            line[0].first = line[i].first;
            line[0].second = line[i].second;
        }
    }
    count+=line[0].second-line[0].first;
    cout<<count<<"\n";
}
```
## 連鎖反應
#### 思路
(後來發現好像是BFS改天再來看看)  
觀察測資可以發現是上下左右加起來=v的都是爆炸範圍，  
由還有其他爆炸可以猜測這鬼東西肯定是需要寫個函式出來標爆炸範圍的，由於不超過30的正數都可以被拿來當爆炸半徑，所以我們用-3來標示被炸到的格子(?)  
剩下就是開始實作，我的想法是先讀成二維陣列，標上下左右會被炸的地方，然後往左右走j步往上下走(i-j)&跟上下走j步往左右走(i-j)去標剩下的範圍，有炸到炸彈可以先記起來座標，再去標那些炸彈的爆炸範圍
至於為什麼不是三個方向去跑，O(n^3)我是無福消受...等測資跑完我筆電風扇會轉到外太空
因為我不喜歡遞迴，我們可以先當數學家用驚人觀察力把遞迴關係寫出沒被石頭擋的常數式找出最小的v去優化一點點時間
```
1 1+1*4=5  
2 1+2*4+1\*4=13  
3 1+3*4+1\*4+2\*4=25  
4 1+4*4+1\*4+2\*4+3\*4=41  
=> 
f(1) = 5
f(n) = f(n-1) + 4 + (n-1)*4， n>=2
f(n) = n*n+(n+1)*(n+1) = n**2+n**2+2*n+1 = 2*(n**2)+ 2*n +1
```
(這東西表達出來好痛苦)
##### solve.cpp
```
not yet ;(
```
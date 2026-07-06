---
title: "ez problem practice"
description: "practice some classic programming problems"
pubDate: 2026-07-01
heroImage: "../../assets/blog-placeholder-1.jpg"
---
註：不是我覺得ez...  
另外分享一個我在寫這些題目查資料的時候覺得很有用的筆記=> [C++競程筆記](https://hackmd.io/@LukeTseng/rJiEKT5ikx)
打算暑假兩天至少一題，然後因為題目蠻雜的所以哪天太閒會記得分類w
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
#### 其他方法
我的方法是合併線段算長度，指導老師有提供一個方法是：開陣列，在L的地方+1代表該長度索引新增的線段；R+1的地方-1代表該線段結束，這樣就不用再去判斷哪些線段可以合併哪些不行，總之就是差分，在遇到同個時間點人有多少的題目也不會因為碰到炸裂測資TLE，蠻妙的
## 連鎖反應
#### 思路
(後來發現好像是BFS改天再來看看)  
2026.7.5更新：我破防了我應該好好寫這題的中高級p1出了個差不多的...
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
## 切割費用
#### 思路
用map存切割的位置，開vector存初始線段長度，再去計算切割費用  
但TLE了:)  
先來看一下我本來想的核心程式  
```
    for (int i=1; i<=n; i++){
        for (int j=0; j<line.size(); j++){
            if (mp[i] < line[j]){
                cost += line[j] - line[j-1];
                line.insert(line.begin()+j, mp[i]);
                break;
            }
        }
    }
```
那麼問題來了：要怎麼把優化？後來發現是vector的insert在搞，所以換個資料結構  
這邊我看大家解答都寫set所以我也用set，如果有重複元素的可以用multiset  
我以前都跳過set不看orz...  
##### solve.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;cin>>n;
    int L;cin>>L;
    long long cost = 0;
    int t1, t2;
    set<int> line = {0, L};
    map<int, int> mp;
    for (int i=0; i<n; i++){
        cin>>t1>>t2;
        mp[t2] = t1;
    }
    for (int i=1; i<=n; i++){
        line.insert(mp[i]);
        auto it = line.find(mp[i]);
        cost += *next(it) - *prev(it);
    }
    cout << cost << endl;
    return 0;
}
```
## 定時K彈
#### 思路
開vector，爆一個就erase
M的部分看成傳遞M-1次就炸
但我被TLE了，模擬又被TLE笑死
##### tle.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int N, M, K;cin>>N>>M>>K;
    int n = 0;
    vector<int> p(N);
    for (int i=1; i<=N; i++){
        p[i-1] = i;
    }
    while(K){
        n = (n+M-1)%p.size();
        p.erase(p.begin()+n);
        K-=1;
    }
    n = n%p.size();
    cout<<p[n]<<"\n";
    return 0;
}
```

## 攤位危機
這是我們校內資訊學科能競的題目，總之就是給起始時間跟終止時間，讓你找出最多人的時候有幾人
#### 思路
其實我在比賽當下根本沒在補我的STL，我那個時候連vector都可以忘記怎麼宣告笑死  
我一開始的想法是陣列開好開滿，然後RE了只拿到子測資遺憾離場  
後來進選手群寫了上面那些題目所以有想到差分  
總之就是結合map讓它自己從小到大開始跑差分  
##### solve.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
  int n;cin>>n;
  int s, f;
  int p=0;
  int cur = 0;
  map<int, int> mp;
  for(int i=0; i<n; i++){
    cin>>s>>f;
    mp[s]++;
    mp[f+1]--;
  }
  for(const auto& m:mp){
    cur+=m.second;
    if(p<cur){
      p = cur;
    }
  }
  cout<<p<<endl;
  return 0;
}
```

## 觀光旅遊
#### 思路
一看前綴和，但我一開始沒想到把map跟pair搞在一起
當初去考的時候只拿到40分子題
總之是經典的變形題
##### solve.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n, m;cin>>n>>m;
    long long sum=0;
    int cur=0;
    int t;
    int s, f;
    map<long long, pair<long long, long long>> mp;
    for(int i=0; i<n; i++){
        cin>>t;
        mp[t].first++;
    }
    for(int i=0; i<m; i++){
        cin>>s>>f;
        mp[s].second++;
        mp[f+1].second--;
    }
    for(auto & p : mp){
        cur+=p.second.second;
        if(p.second.first!=0){
            sum+=p.second.first*cur;
        }
    }
    cout<<sum<<endl;
}
```
## 我忘記題目叫什麼名字但總之APCS202607_3
先上大綱，總之是2026年7月場中高級p3  
然後給定一個陣列，  
要你找最小的值當笛卡兒樹的根節點並分割成兩個子陣列變成二元樹，  
最後問你邊*節點自身數字的總和  
比較偏實作個人覺得還好，也幸好有這題不然也是很炸裂...  
#### 思路
在讀陣列的時候就順便找最小值跟最小值的index  
然後陣列開左開右去sort  
最後開個迴圈跑 total+=(i+2)*a[i] 就好  
因為我真的不想重寫了所以直接上我回指導老師的東西
##### teacher.txt
```
目前實際的題目尚未公布，但如果考點真的是「笛卡爾樹」（照你的說法看起來像是笛卡爾樹的 Min Heap ），無論最後有沒有實際把樹建出來，核心都在於『找出最小值當根節點，再切分左右子陣列』（如果我沒有理解錯你上述的思路。補充：你的做法看起來有點想趨近 divide and conquer(分治法，全名：分而治之法）

但我仍想聽聽你對於下面兩個測資的作法流程，與評估時間複雜度

測資一（完全遞增）：
1 2 3 4 5 … n-1 n

測資二（完全遞減）：
n n-1 n-2 … 3 2 1

如果今天 n 的數據範圍很大（例如 n = 10^5），你可以試著在紙上模擬一下。

依照你的作法：

每次『找最小值切兩半』要找幾次？
每次切出來的子陣列長度是多少？
這樣整個程式跑完，真實的時間複雜度會變成多少呢？
正確性還存在的嗎？
```
##### solve.txt(??)
```
測資一：
我是直接在輸入的時候找最小值，min=1
複雜度O(1)，但輸入的時候就是O(n)
把1在的index記下來，建兩個陣列：L[min_index], R[n-min_index-1]
切出來子陣列是{},{2,3,4,…,n}，在切的過程中分別是O(1),O(n-1)
再sort兩個陣列，分別是O(1), O((n-1)log(n-1))
但沒有排序的必要所以這個測資的sort應該是O(n-1)
再開for迴圈分別計算L, R的cost
以L舉例：
for(int I=0; I< min-index; I++){
    total+=(i+2)*L[i];
}
左右時間複雜度加起來O(n-1)
統計下來就是直接O(n)了
正確性存在（其實範例測資有1～5，有過）

測資二：
找最小會變O(n) ， 但問題不大因為跟輸入一起判斷
子陣列一個n-1一個0
sort O((n-1)log (n-1)), O(1)
再計算cost，跟測資一同理，但因為是排序的最壞情況所以時間複雜度是O((n-1)log (n-1))
我考完寫的理論上正確但我忘記考慮到n-1了
所以最大複雜度應該會是O((n-1)log (n-1))
```
希望實作成績出來不是小丑哈哈，這題我蠻有信心AC的(?)  
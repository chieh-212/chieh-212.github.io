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
花了一整個晚上研究 BFS 實作xD  
BFS + 二分可以解決這題
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int M, N, q;
int si, sj;
int nx, ny;
int R=0;
int xm[4] = {0, 1, 0, -1};
int ym[4] = {1, 0, -1, 0};
int cnt = 0;
vector<vector<int>> board(600, vector<int>(600, 0));
struct boom{
    int x, y, r;
};
bool bfs(int r){
    queue<boom> qu;
    qu.push({si, sj, r});
    vector<vector<int>> ans(600, vector<int>(600, -1));
    ans[si][sj] = r;
    cnt = 0;
    cnt+=1;
    while(!qu.empty()){
        auto[x, y, r] = qu.front();
        qu.pop();
        if(r<=0) continue;
        if(r<ans[x][y]){
            continue;
        }
        for(int i=0; i<4; i++){
            nx = x + xm[i];
            ny = y + ym[i];
            int nr = r-1;
            if(nx>=1&&nx<=M&&ny>=1&&ny<=N&&board[nx][ny]!=-1){
                if(board[nx][ny]>0){
                    if(board[nx][ny]>nr){
                        nr = board[nx][ny];
                    }
                }
                if(nr > ans[nx][ny]){
                    if(ans[nx][ny] == -1){
                        cnt++;
                    }
                    qu.push({nx, ny, nr});
                    ans[nx][ny] = nr;
                }
            }
        }
        if(cnt>=q) return true;
    }
    return false;
}
int main(){
    cin>>M>>N>>q;
    for(int i=1; i<=M; i++){
        for(int j=1; j<=N; j++){
            cin>>board[i][j];
            if(board[i][j]==-2){
                si=i;
                sj=j;
            }
        }
    }
    int left =0, right = N*M;
    while(left<right){
        int mid = (left+right)/2;
        if(bfs(mid)){
            right = mid;
        }
        else{
            left = mid+1;
        }
    }
    cout<<left<<endl;
    return 0;
}
```
## 切割費用
#### 思路
用 map 存切割的位置，開 vector 存初始線段長度，再去計算切割費用  
但 TLE 了:)  
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
那麼問題來了：要怎麼把優化？後來發現是 vector 的 insert 在搞，所以換個資料結構  
這邊我看大家解答都寫 set 所以我也用 set，如果有重複元素的可以用 multiset  
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
開 vector，爆一個就 erase
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
後來認真看了一下發現需要逆推  
正著推可以知道第一個爆炸後的幸運者能表示成 (member[0]+M)%N  
在爆炸結束後會剩下 N-K 人，於是我們需要 +1 去回推出`member[0]`原本在哪，這題觀念大致是這樣  
btw這題是約瑟夫環  
##### solve.cpp
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int N, M, K;cin>>N>>M>>K;
    int l = 0;
    for (int i= N-K+1; i <= N; i++){
        l = (l+M)%i;
    }
    cout<<l+1<<"\n";
    return 0;
}
```
## 攤位危機
這是我們校內資訊學科能競的題目，總之就是給起始時間跟終止時間，讓你找出最多人的時候有幾人  
#### 思路
其實我在比賽當下頭腦挺混亂的，我那個時候連 vector 都可以忘記怎麼宣告笑死  
我一開始的想法是陣列開好開滿，然後 RE 了只拿到子測資遺憾離場  
後來進選手群寫了上面那些題目所以有想到差分  
總之就是結合 map 讓它自己從小到大開始跑差分  
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
一看前綴和，但我一開始沒想到把 map 跟 pair 搞在一起
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
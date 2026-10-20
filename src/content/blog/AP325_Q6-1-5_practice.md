---
title: "AP325 Q6-1 ~ Q6-5 practice"
description: "practice my programming skill"
pubDate: 2026-10-16
heroImage: "../../assets/blog-placeholder-1.jpg"
---

## P-6-1. 小朋友上樓梯最小成本
#### 思路
一維陣列讀資料，然後該階扣分加上上一步扣最少的分  
再把紀錄存下來就好  
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;

int n;
int F[100000];
int dp[100000]={-1};
int main(){
    cin>>n;
    for(int i=0; i<n; i++){
        cin>>F[i];
    }
    dp[1] = F[0];
    dp[2] = F[1];
    for(int i=3; i<=n; i++){
        dp[i] = F[i-1] + min(dp[i-2], dp[i-1]);
    }
    cout<<dp[n]<<endl;
    return 0;
}
```

## P-6-2. 不連續的表演酬勞
#### 思路
dp[0] = R[0];  
但 dp[1] 要選第一天跟第二天的最大值  
然後有分選第 i 天跟不選  
如果選第 i 天，根據題目不能選第 i-1 天：R[i] + dp[i-2]  
如果不選的話就是 dp[i-1]  
紀錄的時候把這兩種情況取最大值  
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int n;
int R[100000];
int dp[100000]={-1};
int main(){
    cin>>n;
    for(int i=0; i<n; i++){
        cin>>R[i];
    }
    dp[0] = R[0];
    dp[1] = max(R[0], R[1]);
    for(int i=2; i<n; i++){
        dp[i] = max(dp[i-1], dp[i-2] + R[i]);
    }
    cout<<dp[n-1]<<endl;
    return 0;
}
```
## P-6-3. 最小監控鄰居的成本
#### 思路
這裡本來是想跟上一題一樣做法  
但後來發現如果假定出選與不選，那後面就都會一直用一開始找到的最小 dp 一直跑下去  
所以我們處理 dp[i] 時一定假設第 i 個監視器是裝的  
裝了之後會發現需要考慮到 i-1, i-2, i-3，就加上去就好  
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;

int n;
int cost[100000];
int dp[100000]={-1};
int main(){
    cin>>n;
    for(int i=0; i<n; i++){
        cin>>cost[i];
    }
    dp[0] = cost[0];
    dp[1] = cost[1];
    dp[2] = cost[2] + min(dp[0], dp[1]);
    for(int i=3; i<n; i++){
        dp[i] = cost[i] + min(min(dp[i-1], dp[i-2]), dp[i-3]);
    }
    cout<<min(dp[n-1], dp[n-2])<<endl;
}
```
## Q-6-4. 闖關二選一
#### 思路
因為他有兩個不一樣的選項，所以分dp0跟dp1  
首先 dp[0] 都是 c[0][0] 跟 c[0][1] - l  
剩下就是dp[i-1]去加上一關跟這關的成本  
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;

int n, l;
int dp0[100000]={0};
int dp1[100000]={0};
int c[100000][2]={0};
int main(){
    cin>>n>>l;
    for(int i=0; i<n; i++){
        cin>>c[i][0]>>c[i][1];
    }
    dp0[0] = abs(c[0][0]-l);
    dp1[0] = abs(c[0][1]-l);
    for(int i=1; i<n; i++){
        dp0[i] = min(dp0[i-1] + abs(c[i-1][0]-c[i][0]), dp1[i-1] + abs(c[i-1][1]-c[i][0]));
        dp1[i] = min(dp0[i-1] + abs(c[i-1][0]-c[i][1]), dp1[i-1] + abs(c[i-1][1]-c[i][1]));
    }
    cout<<min(dp0[n-1], dp1[n-1])<<endl;
}
```
## Q-6-5. 二維最大子矩陣
#### 思路
開兩個迴圈去定長方形的上下，把每欄總和加起來後去跑dp  
##### solve.cpp
```
#include<iostream>
#include<bits/stdc++.h>
using namespace std;

int m, n;
int a[200][200] = {0};
int ma, ans, r;
int main(){
    cin>>m>>n;
    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>a[i][j];
        }
    }
    ans = a[0][0];
    for(int t=0; t<m; t++){
        for(int b=t; b<m; b++){
            int sum[200] = {0};
            for(int j=0; j<n; j++){
                for(int i=t; i<=b; i++){
                    sum[j] += a[i][j];
                }
            }
            ma = sum[0];
            r = sum[0];
            for(int i=0; i<n; i++){
                r = max(sum[i], r+sum[i]);
                ma = max(ma, r);
            }
            ans = max(ans, ma);
        }
    }
    cout<<ans<<endl;
    return 0;
}
```
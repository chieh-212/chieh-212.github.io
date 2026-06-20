---
title: "DP practice"
description: "Practice my poor dynamic programming skill"
pubDate: 2026-06-14
heroImage: "../../assets/blog-placeholder-1.jpg"
---
等我想到再回來寫筆記，先把AC的程式放上來:)  
之所以會想回來練演算法是因為我發現我實作能力弱到有剩，思考的同時手根本沒在動。  
一年級的時候也發生了忘記語法校內掉到第三沒辦法去比區賽的憾事QQ  

# 最長遞增子序列（LIS）
```
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main(){
    int n; cin>>n;
    vector<int> num(n);
    vector<int> dp(n, 1);
    for(int i=0; i<n; i++){
        cin>>num[i];
    }
    for(int i=0; i<n; i++){
        for(int j=0; j<i; j++){
            if(num[j] < num[i]){
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    cout<<*max_element(dp.begin(), dp.end())<<endl;
    return 0;
}
```

# 硬幣湊金額（順序敏感）
```
#include<bits/stdc++.h>
using namespace std;

int main(){
    int N;cin>>N;
    int X;cin>>X;
    vector<int> num(N);
    vector<int> cases(X+1, 0);
    int M = 1000000007;
    cases[0] = 1;
    for (int i=0; i<N; i++){
        cin>>num[i];
    }
    for (int i=1; i<=X; i++){
        for (int j=0; j<N; j++){
            if((i-num[j])>=0){
                cases[i] = (cases[i] + cases[i-num[j]]) % M;
            }
        }
    }
    cout<<cases[X]<<"\n";
    return 0;
}
```
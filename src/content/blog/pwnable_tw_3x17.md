---
title: "pwnable.tw_3x17_writeup"
description: "challenge: 3x17"
pubDate: 2026-07-08
heroImage: "../../assets/blog-placeholder-1.jpg"
---
## 3x17
##### discription: 3 x 17 = ?
#### checksec
```
[*] '/home/chiehhhhh/pwnable_tw/3x17'
    Arch:       amd64-64-little
    RELRO:      Partial RELRO
    Stack:      No canary found
    NX:         NX enabled
    PIE:        No PIE (0x400000)
```
有NX沒canary，直覺ROP題  
#### analyze
這個binary被stripped過，總之entry在0x401A50  
剩下就是慢慢看慢慢逆  

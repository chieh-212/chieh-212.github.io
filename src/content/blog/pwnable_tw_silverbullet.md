---
title: "pwnable.tw_silver_bullet_writeup"
description: "challenge: silver bullet"
pubDate: 2026-07-24
draft: true
heroImage: "../../assets/blog-placeholder-1.jpg"
---
## 3x17
##### discription: Please kill the werewolf with silver bullet!
#### checksec  
```
[*] '/home/chiehhhhh/pwnable_tw/silver_bullet'
    Arch:       i386-32-little
    RELRO:      Full RELRO
    Stack:      No canary found
    NX:         NX enabled
    PIE:        No PIE (0x8048000)
    Stripped:   No
```
反射覺得ROP，反正先繼續看  

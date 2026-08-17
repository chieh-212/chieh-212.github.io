---
title: "資訊安全怎麼入坑"
description: "學一輩子資訊安全吧 :3"
pubDate: 2026-08-17
heroImage: "../../assets/blog-placeholder-1.jpg"
---
## 前言  
公益營的時候有人在 Slido 問怎麼寫外掛跟寫病毒，然後我簡單回答完後有幾個學員下課跑來問我更多 xDD  
於是就有這篇貼文了，希望可以幫助到想要學習資訊安全的人！相信你們一定可以變得很強  
## 關於我  
我 2025.4 開始學習 CTF，那年在 THJCC 跟 AIS3 pre-exam 幾乎都是墊底，在那之後碰資安就是十月金盾獎的時候了，沒打出什麼成績讓當初懷有憧憬的我很迷茫。到了 2026.2，我再次參與 THJCC，驚險拿到了**學生賽區的第十名**也同時獲得**潛力獎**的認可，在那之後又對資安重懷熱情，參與了尋找科技女婕思，跟隊友獲得**高中職組第二名**。在這之後我購買 OSCP 的課程學習滲透測試，並備考 OSCP+ 與 iPAS 中級資訊安全工程師，相對擅長 Pentest 與 Pwn <= 現在在這裡  
## 開始你的學習  
我自己當初是從 CTF 比賽開始入坑，CyLab Security Academy 的 Easy 水題都打一遍，打不出來就看別人的 write-up  
除此之外因為熱情所以每題都有寫 write-up，同時可以檢驗自己究竟有沒有理解題目  
自己覺得用 CTF 去學習相對能接觸多面向？  
不過第一件要學的事情是熟悉 cmd 基本指令，網路查詢都有  
## CTF (Capture the flag)
一種資訊安全競賽，常見分類有：
- Web
- Crypto
- Reverse
- Pwn / binary exploitation
- Misc (Forensics, OSINT,...)  

賽制的部分：
- Jeopardy
- King of Hill
- Attack & Defense  

絕大部分 CTF 競賽都會是 Jeopardy  
詳細介紹的話把上面那段拿去問 AI。  
但在這邊特別提一手外掛跟病毒都和 Reverse 有關；同時病毒也有關 Web。
## 學習平台
### CTF
- NCKU CTF
- CyLab Security Academy (原稱 picoCTF)
- hacker101  
> 其實還有 LoTuX CTF，但網站掛了
### Web
- PortSwigger Web Security Academy  
### Crypto
- Crypto Hack
### Reverse
- Reverse.kr  
### Pwn
- Pwn.college
- Pwnable.tw  
### Misc  
- 窩不知道QQ  

然後有些平台上手難度可能會比較高，但只要想通題目絕對受益良多  
不推薦直接去問 AI，自己人腦想解法 -> 和 AI 交流你對題目的想法 -> 真的不行就看別人 write-up -> 還是看不懂就打破砂鍋問 AI 到底  
## 一些資源
Ice1187 整理的[資安學習資源](https://github.com/Ice1187/TW-Security-and-CTF-Resource)  
SCIST 的資訊安全課程跟影片大推  
## Penetration Testing
中翻是滲透測試，大致就是給你一個網站 ( 也稱靶機 )，你要找到漏洞，打進伺服器內部並嘗試提升權限至 root  
建議要先多打點 Web ，學習資源那邊的網站真的推，保母級教程  
想學滲透的話可以由 Hack The Box 平台入手，先打免費的靶機。不會打也沒關係，跟學 CTF 一樣可以看別人怎麼解，然後平台上也有官方的 walkthrough，可以透過 walkthrough 學一些工具  
真的很有興趣可以買 Hack The Box Academy，對學生來說很夠用了，據朋友說 OSCP 裡面有的它也有  
那我也推銷個我的 [Pentest Guide]()，基本上是我在打機器的時候覺得之後還會碰到的手法、好用的工具跟我自己覺得好玩的其它東西，  
但建議看之前先有點基礎，不然會很吃力  
## 程式語言的部分  
基本上寫腳本都是使用 Python，建議可以學一下常見的模組用法  
Web 的話就是 requests, socket,...  
Crypto 因為我自己也沒有很熟悉，所以基本上有用過的只有 cryptodome  
Reverse 的話就是逆向完寫個腳本看要把 flag 逆回來還是怎樣  
Pwn 就基本上是 Pwntool 一把梭  
Misc 也有很多東西有關 Python，比如 PyJail，總之就是 Python 是你的好朋友  

C 語言的話如果對 Reverse & Pwn 有興趣務必學習，可以碰到很多底層的東西，以及 ELF 去使用逆向工具反組譯也會看到偽代碼是用 C 的語法。  
對 Web 很愛的話也可以研究一下 PHP，~~世界上最好的網頁開發語言~~  
## 打比賽  
如題，比賽可以磨練自己的心態，有時候運氣好拿到不錯的名次也會很有成就感  
這邊就寫幾個臺灣比較有名或我私心喜歡的比賽：  
- THJCC CTF  
- MyFirstCTF ( 基於 AIS3 pre-exam )
- AIS3 pre-exam
- 科技女婕思 ( 僅生理女性可參與 )
- No Hack No CTF
- 金盾獎
- 神盾盃
- AIS3 EOF 

有些是個人賽有些是團體賽，這邊就請自己查資料xD  
所以找到志同道合的夥伴也是很重要的！！  
如果你把心思動到國外的 CTF 比賽，那推薦你去 CTFtime 註冊帳號然後看有什麼酷比賽，揪團打  
## 營隊
- AIS3
- AIS3 Junior
- AIS3 club 一系列體驗營跟幹部訓練  

AIS3 是教育部培育資通人才的計劃，AIS3 需要在 AIS3 pre-exam 打到可以通過門檻，印象中是取 100 人正取；30 人備取 ( 要打到前幾名應該很清楚了吧 )  
AIS3 Junior 就比較適合沒有資訊安全基礎的人去，可以結交不同朋友然後跟助教混熟xD  
AIS3 club 有時候會辦一日體驗營，那畢竟還是社團導向，所以也有提供給資安社團幹部訓練，讓大家交流如何管理資安社團跟課程  
喔對了，上面那些營隊幾乎都在暑假期間，有過夜會包住，~~視情況還有免費的一餐，推推~~  
## AIS3
除了上面營隊，AIS3 還有其它活動，在這裡介紹一下 AIS3 好厲駭，你可以報名去成為學員，會有很多線上進階課程可以參加，你也可以學到 CTF 相對不太會出現的東西，比如雲端安全  
它有高階跟導師兩種培訓，高階就是可以參加線上課程、成果發表；導師則建立在高階上，會有業界或學界的資安專業人士指導你  
除此之外，你如果是好厲駭的學員，可以參加行政院網路攻防遴選，通過後可以成為當年度行政院網路攻擊手，聽起來就很帥  
那其他的我就不多介紹，官網應該有詳細資料，總之 AIS3 肯定能幫到你學習資安，所以我給了一個 h2  
## 找朋友  
我當初是發 Threads，加了一堆大佬，反正不要社恐:)  
## 總結
因為現在已經 03:43，我要死了，反正有想問的可以加我 Discord  
晚安
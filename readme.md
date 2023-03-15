![Screenshot](https://playablefactory.com/wp-content/uploads/2022/01/animated_dark_with_title_logo_pf.gif)

# Playable Todo

Bu proje Playable Factory Software Engineer Case Study uygulaması için geliştirilmiştir.

Öncelikle selamlar. Projenin 1. günü (14 mart) tarihinde doğum günüm olduğu için o gün çok fazla proje üzerine çalışamadım ancak daha fazla vakit istemiyorum ve elimden geldiğince kısa sürede geliştirmek istedim. Projeyi geliştirirken optimize ve production-ready bir yapıdan çok, olabildiğince fazla task yapmaya çalıştım. bu sebeple optimizasyon ve diğer konularda büyük problemler olabilir.

# Proje Kurulumu

Adım 1: Projeyi github'dan clonelayın.

```
git clone https://github.com/SirMacr0/playable-todo.git
```



Adım 2: Projenin gerekli kütüphanelerini indirin.

```
proje dosyası/client -> npm install
```

```
proje dosyası/server -> npm install
```

Not: Proje Linux'ta çalıştırılacaksa nodemon hata verebiliyor.

```
sudo npm install -g nodemon
```

komutu ile nodemon kütüphanesini global olarak indirerek sorun çözülür.
![Screenshot](https://raw.github.com/sirmacr0/playable-todo/master/Screenshots/ss_1.png)

Adım 3: Projeyi çalıştırın

```
proje dosyası/client -> npm run start
```

```
proje dosyası/server -> npm run dev
```
![Screenshot](https://raw.github.com/sirmacr0/playable-todo/master/Screenshots/ss_2.png)
![Screenshot](https://raw.github.com/sirmacr0/playable-todo/master/Screenshots/ss_3.png)


# Notlar
-Projenin veritabanı kendi mongodb hesabımın free tier veritabanı.
-User kısmı manuel değildir. İstediğiniz gibi kaydolup test edebilirsiniz.
-Imageupload ve fileupload kısımlarına zaman yetmediği için bu şekilde teslim edildi. Bu amaç için Nodejs Multer kütüphanesi indirlip kuruldu ancak bitirilemedi.

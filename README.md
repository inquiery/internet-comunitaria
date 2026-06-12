# Sobre o projeto

Um hotspot wifi é um roteador configurado para que os usuários ao se conectarem sejam solicitados a fazer algum processo de ingresso na rede antes de terem o acesso à internet liberado. Esse ingresso geralmente se dá através da apresentação de uma página de cadastro, ou de check-in em uma página específica.

A solução apresentada aqui é uma forma simplificada do processo de ingresso, na qual o usuário é direcionado a uma página web quando se conecta ao wifi, e na qual pode simplesmente clicar em “Conectar” para liberar o acesso. Ao fazer isso, ele será direcionado automaticamente a um link configurado por quem está fornecendo o acesso com essa solução. Esse link pode ser um site de uma empresa ou mesmo o endereço de uma rede social.

A página web a qual o usuário é direcionado ao se conectar no Wifi é chamada de captive portal. Os arquivos do captive portal se encontram no github no endereço https://github.com/inquiery/internet-comunitaria.

# Dispositivos recomendados

Você pode usar essa solução em qualquer dispositivo Mikrotik com RouterOS. Abaixo segue modelos de dispositivos já pensados para uso externo (na rua), facilitando a escolha. É importante notar que para aplicar essa solução o dispositivo escolhido precisa ter licença nível 4.

SXTsq 5 ax (https://mikrotik.com/product/sxtsq_5ax)  
GrooveA 52 (https://mikrotik.com/product/RBGrooveA-52HPnr2)  
OmniTIK 5 ac (https://mikrotik.com/product/rbomnitikg_5hacd)  
OmniTIK 5 PoE ac (https://mikrotik.com/product/rbomnitikpg_5hacd)  

# Primeiro acesso ao RouterOS Mikrotik

Ao ligar o dispositivo Mikrotik, para fazer o primeiro acesso, você pode utilizar a ferramenta WinBox do fabricante, que pode ser baixada em https://mikrotik.com/download/winbox. Acessando o link, faça o download da ferramenta que corresponda ao seu sistema operacional.

Ligue o dispositivo Mikrotik e conecte a porta de rede do mesmo no seu computador ou no seu roteador de internet. Utilize o PoE caso necessário.

Abaixo imagem ilustrativa da ligação. Para mais detalhes consulte o manual do dispositivo que você está utilizando.

<img width="1496" height="865" alt="image" src="https://github.com/user-attachments/assets/f90f5862-44f6-4964-a325-ac8938d118c9" />

Com o dispositivo ligado, pelo seu computador acesse a ferramenta WinBox. Ela ira identificar automaticamente os dispositivos Mikrotik ligados a rede e mostrará em uma tabela na direita da tela. Clique na linha com o endereço MAC do seu dispositivo. Logo após, nos campos apresentados a esquerda o “Connect to” será preenchido automaticamente com o endereço MAC no qual foi clicado, e no “Login” por padrão deve-se utilizar “admin”, e no “Password” deixar em branco. Após isso clique em “Connect”.

<img width="1092" height="603" alt="image" src="https://github.com/user-attachments/assets/3097c164-e971-442e-b2fb-2e139ff4e04c" />

No primeiro acesso será solicitado que você coloque uma senha. Para segurança, faça esse procedimento e escolha uma senha segura. Em “Old Password” você deixará em branco (por padrão de fábrica os dispositivos Mikrotik vem com senha em branco), em “New Password” você digita a senha que preferir, e depois repita em “Confirm Password”. Após isso, clique em “Change Now”.

<img width="328" height="161" alt="image" src="https://github.com/user-attachments/assets/6e3830e8-3465-4136-9acd-1c0baed182f3" />

# Redefinir as configurações

O dispositivo pode vir com algumas configurações de fábrica, as quais podem ser incompatíveis com a solução de Hotspot como queremos, então precisamos removê-las. Para fazer isso, no menu esquerdo do WinBox, vamos clicar em “New Terminal”.

<img width="1092" height="603" alt="image" src="https://github.com/user-attachments/assets/92860dd9-de04-4a32-85b1-edab7fbaab95" />

Na janela de terminal que será aberta, caso aparece uma mensagem informando “Do you want to see the software license? [Y/n]:” apenas pressione “N” no teclado para continuar e abrir o terminal para digitação de comandos. Após isso, digite o comando abaixo (e pressionar ENTER ao terminar de digitar):

```
/system/reset-configuration no-defaults=yes
```

Após pressionar ENTER será apresentada uma mensagem solicitando sua confirmação, pressione “Y” no teclado para confirmar.

```
Dangerous! Reset anyway? [y/N]:
```

O dispositivo será reinicializado e o WinBox perderá a conexão. Aguarde até que o WinBox se conecte novamente.

# Configurações do Hotspot

Por padrão, quando o WinBox conectar novamente, já abrirá a janela do Terminal que estava aberta anteriormente, mas caso não esteja, clique novamente na opção “New Terminal” do menu esquerdo.

Antes de fazer as configurações próprias do Hotspot, precisamos criar a interface bridge sobre a qual o Hotspot será responsável. Isso é feito para caso você possua um dispositivo dual-band (que opere tanto na banda de 2.4Ghz quanto de 5Ghz) você posa fazer com que o Hotspot opere sobre as duas interfaces de forma unificada.

Primeiramente digite o comando abaixo para criar a interface bridge que unificará as interfaces wifi:

```
/interface/bridge/add protocol-mode=none name=wifi
```

Agora vamos precisar associar todas as interfaces wifi a essa bridge, para isso vamos listar todas elas com o comando abaixo:

```
/interface/wireless/print proplist=name
```

Após digitar esse comando, você verá no terminal uma lista com as interfaces wifi, conforme exemplo abaixo:

```
[admin@MikroTik] > /interface/wireless/print proplist=name
Flags: X - DISABLED; R - RUNNING
 0 X  name="wlan1"

 1 X  name="wlan2"
```

No exemplo acima, o dispositivo possui duas interfaces wifi, a interface “wlan1” e a “wlan2”, portanto, será necessário associar as duas com a bridge, utilizando os comandos abaixo:

```
/interface/bridge/port/add bridge=wifi interface=wlan1
/interface/bridge/port/add bridge=wifi interface=wlan2
```

Caso você tenha apenas a interface “wlan1” quando executou o comando de listar as interfaces wifi, digite apenas o primeiro comando acima.

Por fim, para fazer as configurações do Hotspot, execute as linhas de comandos abaixo.

```routeros
/ip/dhcp-client/add interface=ether1
/ip/address/add interface=wifi address=172.50.1.1/24
/ip/pool/add name=captive-pool ranges=172.50.1.2-172.50.1.254
/ip/dhcp-server/network/add address=172.50.1.0/24 gateway=172.50.1.1 dns-server=172.50.1.1
/ip/dhcp-server/add name=captive-dns interface=wifi address-pool=captive-pool
/ip/dns/set allow-remote-requests=yes
/ip/hotspot/user/profile/add name=captive-user-profile add-mac-cookie=no rate-limit=2M/10M
/ip/hotspot/profile/add name=captive-profile hotspot-address=172.50.1.1 dns-name=wifi.local login-by=http-chap,trial trial-uptime-limit=1d trial-uptime-reset=0 trial-user-profile=captive-user-profile install-hotspot-queue=yes rate-limit=10M/50M
/ip/hotspot/add name=captive-portal interface=wifi profile=captive-profile disabled=no
/ip/firewall/address-list/add list=localnet address=10.0.0.0/8
/ip/firewall/address-list/add list=localnet address=172.16.0.0/12
/ip/firewall/address-list/add list=localnet address=192.168.0.0/16
/ip/firewall/address-list/add list=localnet address=169.254.0.0/16
/ip/firewall/filter/add chain=input in-interface=ether1 src-address-list=!localnet connection-state=new action=drop
/ip/firewall/nat/add chain=srcnat out-interface=ether1 action=masquerade
```

Configurar Wifi

Agora você precisa configurar um nome para sua rede wifi, e caso queira, também uma senha, embora colocar senha possa dificultar o acesso ao wifi se o usuário não possuir uma forma fácil de descobri-la).

Primeiramente você precisa indicar se vai existir senha ou não criando um perfil de senha.

Para criar um perfil em que não existirá senha no wifi, digite o comando abaixo no terminal.

```
/interface/wireless/security-profiles/add name=captive-wifi-password mode=none
```

E caso queira que o wifi possua senha, utilize a linha abaixo, porém altere onde está escrito “senhadowifi” para a senha que preferir.

```
/interface/wireless/security-profiles/add name=captive-wifi-password mode=dynamic-keys authentication-types=wpa2-psk wpa2-pre-shared-key=senhadowifi
```

Caso você já tenha configurado um perfil de senha utilizando um dos comandos anteriores, para alterar você deve usar comandos diferentes.

Para alterar o perfil para que o wifi fique sem senha:

```
/interface/wireless/security-profiles/set [find where name=captive-wifi-password] mode=none
```

Para alterar o perfil para que o wifi fique com senha (lembre-se de alterar para sua senha de preferência no final do comando onde está escrito “senhadowifi”):

```
/interface/wireless/security-profiles/set [find where name=captive-wifi-password] mode=dynamic-keys authentication-types=wpa2-psk wpa2-pre-shared-key=senhadowifi
```

E por fim, configurar a interface wifi, alterando as propriedades para o modo correto e colocando um nome na rede. Altere no final do comando abaixo onde está escrito “Internet-Comunitaria” para o nome que você quer para sua rede wifi:

```
/interface/wireless/set wlan1 disabled=no mode=ap-bridge installation=indoor frequency=auto country=brazil-anatel security-profile=captive-wifi-password ssid=Internet-Comunitaria
```

Se o seu dispositivo Mikrotik for dual-band (opera tanto na banda de 2.4Ghz quanto na de 5Ghz), você vai ter que configurar a segunda interface wifi, para isso basta trocar “wlan1” no comando anterior para “wlan2”, ficando assim:

```
/interface/wireless/set wlan2 disabled=no mode=ap-bridge installation=indoor frequency=auto country=brazil-anatel security-profile=captive-wifi-password ssid=Internet-Comunitaria
```

# Configurar melhores parâmetros de banda do wifi

Alguns dispositivos da Mikrotik não vem com o modo de rede de melhor performance pré-configurado no wifi, e caso você não tenha um conhecimento prévio sobre redes wireless será difícil configurá-la da melhor forma pelo terminal. Vamos então configurar a banda (que é o que comumente chamamos de wifi 2G, 2.4G ou 5G) através do menu do WinBox, para isso clique no menu lateral Wireless, caso apareça um submenu, clique na opção Wireless do submenu.

<img width="856" height="499" alt="image" src="https://github.com/user-attachments/assets/cb012cf1-01b6-4095-9c35-415dcdb27af7" />

Vai abrir a janela com as interfaces wireless e você vera um item na lista chamado “wlan1”, e caso seu dispositivo seja dual-band, aparecerá também “wlan2”.

<img width="856" height="499" alt="image" src="https://github.com/user-attachments/assets/ef1085c1-3b36-4808-92b5-0aa05c32e931" />

De um duplo clique no item wlan1 da lista para abrir as propriedades da interface. Na janela de propriedades, você vera uma opção chamada “Band”, e clicando no valor que está selecionado atualmente abrirá uma lista com todas as opções disponíveis. Para facilitar sua escolha, siga a ordem de prioridade conforme abaixo, e selecione dentro as opções disponíveis, a que estiver mais acima na lista abaixo:

5Ghz-A/N/AC/AX
5Ghz-A/N/AC
5Ghz-A/N
2Ghz-B/G/N
2Ghz-B/G

Na opção que diz Channel Width, selecione também entre as opções disponíveis a que tiver mais acima na lista hierárquica abaixo:

20/40/80/160Ghz XX
20/40/80Mhz XX
20/40Mhz XX
20Mhz

Caso você tenha também a interface wlan2 na lista, faça as duas configurações acima também para a interface wlan2.

# Personalizar o Captive Portal

## Baixando arquivos

Faça download dos arquivos do repositório para uma pasta no seu computador. Você pode baixar todos os arquivos em um único compactado pelo link abaixo:

https://github.com/inquiery/internet-comunitaria/archive/refs/heads/main.zip

Após baixar e descompactar, você terá uma pasta contendo os arquivos conforme na imagem abaixo.

<img width="906" height="409" alt="image" src="https://github.com/user-attachments/assets/761b9cbc-8c5c-4209-831d-1ac654e309f9" />

## Personalizando textos

Você pode fazer algumas personalizações no portal para se adaptar melhor ao seu cenário. Abrindo o arquivo login.html por exemplo, você pode alterar a linha que diz “Bem vindo a Internet da Praça do Bairro” por algo mais relevante para você, como por exemplo “Bem vindo a Internet do Mercado Santana” ou “Bem vindo a Internet da Barbearia Stylus”. Preste atenção para não alterar o código HTML, altere apenas o texto. Observe algumas linhas do arquivo login.html abaixo. O que aparece em verde é texto que pode ser alterado, e em vermelho é código HTML que precisa ser mantido.


12 $\color{red}{\text{      <div class='top'>}}$
13 $\color{red}{\text{        <div class='logo-box'>}}$
14 $\color{red}{\text{          <img class='logo-img' id='logo' src='' alt='Internet Comunitária'>}}$
15 $\color{red}{\text{        </div>}}$
16 $\color{red}{\text{        <div class='text-center'>}}$
17 $\color{green}{\text{          Bem vindo a Internet da <}}$$\color{red}{\text{span class='text-bold nowrap'>}}$$\color{green}{\text{Praça do Bairro}}$$\color{red}{\text{<span>}}$
18 $\color{red}{\text{        </div>}}$
19 $\color{red}{\text{      </div>}}$


# Sobre o projeto

Um hotspot wifi é um roteador configurado para que os usuários ao se conectarem sejam solicitados a fazer algum processo de ingresso na rede antes de terem o acesso à internet liberado. Esse ingresso geralmente se dá através da apresentação de uma página de cadastro, ou de check-in em uma página específica.

A solução apresentada aqui é uma forma simplificada do processo de ingresso, na qual o usuário é direcionado a uma página web quando se conecta ao wifi, e na qual pode simplesmente clicar em “Conectar” para liberar o acesso. Ao fazer isso, ele será direcionado automaticamente a um link configurado por quem está fornecendo o acesso com essa solução. Esse link pode ser um site de uma empresa ou mesmo o endereço de uma rede social.

A página web a qual o usuário é direcionado ao se conectar no Wifi é chamada de “captive-portal”. Os arquivos do captive-portal se encontram no github no endereço https://github.com/inquiery/internet-comunitaria.

# Dispositivos recomendados

Você pode usar essa solução em qualquer dispositivo Mikrotik. Abaixo segue modelos de dispositivos já pensados para uso externo (na rua), facilitando o uso.

SXTsq 5 ax (https://mikrotik.com/product/sxtsq_5ax)  
GrooveA 52 (https://mikrotik.com/product/RBGrooveA-52HPnr2)  
OmniTIK 5 PoE ac (https://mikrotik.com/product/rbomnitikpg_5hacd)  

Além disso é possível utilizar qualquer roteador Mikrotik de uso interno, como um hEX lite (https://mikrotik.com/product/RB750r2) que é um roteador de baixo custo, e conectar a ele um AP (Access Point) que servirá somente para receber as conexões wifi e repassar diretamente ao roteador Mikrotik (funcionando em modo bridge), porém as configurações apresentadas aqui são para dispositivos Mikrotik que já tenham interface wifi integrada.

# Primeiro acesso ao RouterOS Mikrotik

Ao ligar o dispositivo Mikrotik, para fazer o primeiro acesso, você pode utilizar a ferramenta WinBox do fabricante, que pode ser baixada em https://mikrotik.com/download/winbox. Acessando o link, faça o download da ferramenta que corresponda ao seu sistema operacional.

Ligue o dispositivo Mikrotik e conecte a porta de rede do mesmo no seu computador ou no seu roteador de internet. Utilize o PoE caso necessário.

Abaixo imagem ilustrativa da ligação. Para mais detalhes consulte o manual do dispositivo que você está utilizando.

<img width="1500" height="869" alt="image" src="https://github.com/user-attachments/assets/e5f9600a-d0b1-4ef7-a255-c7c8a08a8169" />

Com o dispositivo ligado, pelo seu computador acesse a ferramenta WinBox. Ela ira identificar automaticamente os dispositivos Mikrotik ligados a rede e mostrará em uma tabela na direita da tela. Clique na linha com o endereço MAC do seu dispositivo, logo após, nos campos apresentados a esquerda o “Connect to” será preenchido automaticamente com o endereço MAC clicado, e no “Login” por padrão deve-se utilizar “admin”, e no “Password” deixar em branco. Após isso clique em “Connect”.

<img width="1202" height="732" alt="image" src="https://github.com/user-attachments/assets/7d196834-c9f6-4e98-b434-9214cbbe5651" />

No primeiro acesso será solicitado que você coloque uma senha. Para segurança, faça esse procedimento e escolha uma senha segura. Em “Old Password” você deixará em branco (por padrão de fábrica os dispositivos Mikrotik vem com senha em branco), em “New Password” você digita a senha que preferir, e depois repita em “Confirm Password”. Após isso, clique em “Change Now”.

<img width="328" height="161" alt="image" src="https://github.com/user-attachments/assets/c20b94e4-8f40-43ad-9be9-0523ba31be13" />

# Resetar configurações

O dispositivo pode vir com algumas configurações de fábrica, as quais podem ser incompatíveis com a solução de Hotspot como queremos, então precisamos resetar (deletar) essas configurações. Para fazer isso, no menu esquerdo do WinBox, vamos clicar em “New Terminal”, na janela de terminal que será aberta, digitar o seguinte comando (e pressionar ENTER ao terminar de digitar):

```routeros
/system/reset-configuration no-defaults=yes
```

Após pressionar ENTER será apresentada uma mensagem solicitando sua confirmação, aperte “Y” no teclado para confirmar.

```routeros
Dangerous! Reset anyway? [y/N]:
```

O dispositivo será reinicializado e o WinBox perderá a conexão. Aguarde até o WinBox conseguir conectar novamente.

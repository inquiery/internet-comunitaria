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

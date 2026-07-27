# Pasta de Imagens e Logos

Coloque os arquivos estáticos de imagens, logos, banners e ícones nesta pasta (`public/images/`).

### Como utilizar no código (Next.js):
No Next.js, tudo o que estiver dentro da pasta `public` é servido a partir da raiz `/`.

Exemplo:
- Arquivo salvo em: `public/images/logo.png`
- No código (componente/página):
  ```tsx
  import Image from 'next/image';

  <Image 
    src="/images/logo.png" 
    alt="Logo Mr. Sole" 
    width={200} 
    height={50} 
  />
  ```
  ou com a tag HTML padrão `<img>`:
  ```html
  <img src="/images/logo.png" alt="Logo Mr. Sole" />
  ```

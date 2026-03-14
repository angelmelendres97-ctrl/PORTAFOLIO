# Configuración de Cloudflare Tunnel para Angel Melendres Portfolio

## Requisitos Previos

1. Cuenta en [Cloudflare](https://cloudflare.com)
2. Dominio registrado y configurado en Cloudflare
3. cloudflared instalado

## Instalación de cloudflared

### Windows (PowerShell - como Administrador)
```powershell
winget install cloudflared
```

### macOS
```bash
brew install cloudflare/cloudflare/cloudflared
```

### Linux
```bash
sudo curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared
```

## Autenticación

```bash
cloudflared login
```

Esto abrirá el navegador para iniciar sesión con tu cuenta de Cloudflare y seleccionar el dominio.

## Crear el Túnel

```bash
# Crear túnel
cloudflared tunnel create angel-portfolio

# Anotar el Tunnel ID que aparece (ej: a1b2c3d4-...)
```

## Configurar el Túnel

Crear archivo `tunnel.yml`:

```yaml
tunnel: a1b2c3d4-e5f6-7890-abcd-ef1234567890
protocol: http2

ingress:
  # Frontend
  - hostname: tu-dominio.com
    service: http://localhost:5173
  
  # Backend API
  - hostname: api.tu-dominio.com
    service: http://localhost:4000
  
  #catch-all
  - service: http_status:404
```

## Ejecutar el Túnel

```bash
# Ejecutar en segundo plano
cloudflared tunnel run angel-portfolio --config tunnel.yml
```

## Configurar DNS

```bash
# Apuntar dominio al túnel
cloudflared tunnel route dns angel-portfolio tu-dominio.com
cloudflared tunnel route dns angel-portfolio api.tu-dominio.com
```

## Con Docker

También puedes usar cloudflared desde Docker:

```bash
docker run -d \
  --name cloudflared \
  --network host \
  cloudflare/cloudflared:latest \
  tunnel run --token TU_TOKEN_DE_TUNNEL
```

## Obtener el Token del Túnel

1. Ve a Cloudflare Dashboard > Zero Trust > Tunnels
2. Selecciona tu túnel
3. Clic en "Configure" > "Tokens"
4. Copia el token de instalación

---

**Nota**: Para producción, se recomienda configurar el túnel como servicio del sistema para que inicie automáticamente.

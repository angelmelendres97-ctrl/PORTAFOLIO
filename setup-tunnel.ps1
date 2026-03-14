<#
    Cloudflare Tunnel Setup Script for Angel Melendres Portfolio
    Ejecutar como Administrador
#>

Write-Host "=== Cloudflare Tunnel Setup ===" -ForegroundColor Cyan
Write-Host ""

# Verificar si cloudflared está instalado
$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue

if (-not $cloudflared) {
    Write-Host "cloudflared no está instalado. Instalando..." -ForegroundColor Yellow
    
    # Descargar cloudflared
    $tempDir = "$env:TEMP\cloudflared"
    New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
    
    Write-Host "Descargando cloudflared..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "$tempDir\cloudflared.exe"
    
    # Mover a PATH
    Move-Item -Force "$tempDir\cloudflared.exe" "C:\Windows\System32\cloudflared.exe"
    Remove-Item -Force -Recurse $tempDir
    
    Write-Host "cloudflared instalado correctamente!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Pasos para configurar el túnel:" -ForegroundColor Cyan
Write-Host "1. Ejecuta: cloudflared login" -ForegroundColor White
Write-Host "2. Selecciona tu dominio en el navegador" -ForegroundColor White
Write-Host "3. Crea el túnel: cloudflared tunnel create angel-portfolio" -ForegroundColor White
Write-Host "4. Copia el Tunnel ID mostrado" -ForegroundColor White
Write-Host "5. Edita tunnel.yml y reemplaza el Tunnel ID" -ForegroundColor White
Write-Host "6. Ejecuta: cloudflared tunnel run angel-portfolio --config tunnel.yml" -ForegroundColor White
Write-Host ""

# Solicitar datos al usuario
$tunnelId = Read-Host "Ingresa el Tunnel ID (ej: a1b2c3d4-e5f6-7890-abcd-ef1234567890)"
$domain = Read-Host "Ingresa tu dominio (ej: miportafolio.com)"
$apiDomain = Read-Host "Ingresa el subdominio para API (ej: api.miportafolio.com)"

# Crear archivo de configuración
$config = @"
tunnel: $tunnelId
protocol: http2

ingress:
  - hostname: $domain
    service: http://localhost:5173
  
  - hostname: $apiDomain
    service: http://localhost:4000
  
  - service: http_status:404
"@

$config | Out-File -FilePath "tunnel.yml" -Encoding utf8

Write-Host ""
Write-Host "Archivo tunnel.yml creado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora ejecuta:" -ForegroundColor Cyan
Write-Host "  cloudflared tunnel route dns angel-portfolio $domain" -ForegroundColor White
Write-Host "  cloudflared tunnel route dns angel-portfolio $apiDomain" -ForegroundColor White
Write-Host "  cloudflared tunnel run angel-portfolio --config tunnel.yml" -ForegroundColor White

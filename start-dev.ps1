#!/usr/bin/env pwsh

Write-Host "🚀 Iniciando Epsilon Academy..." -ForegroundColor Green
Set-Location ".\epsilon-academy"

Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host "🌟 Iniciando servidor de desarrollo..." -ForegroundColor Green
npm run dev

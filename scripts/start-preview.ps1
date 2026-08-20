$projectRoot = 'C:\Users\pedro\Downloads\maiscode_ponto-vit'
$node = 'C:\nvm4w\nodejs\node.exe'
$nextCli = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
$stdout = Join-Path $projectRoot '.pontovit-prod.log'
$stderr = Join-Path $projectRoot '.pontovit-prod.err.log'

Remove-Item -LiteralPath $stdout -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $stderr -Force -ErrorAction SilentlyContinue

Start-Process -FilePath $node -ArgumentList @($nextCli, 'start', '-p', '3002') -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr

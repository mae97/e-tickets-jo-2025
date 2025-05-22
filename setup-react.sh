#!/bin/bash

echo "🚀 Démarrage du setup frontend React..."

# 1. Installer Node.js (v18 LTS) + npm
echo "🔧 Installation de Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Vérification
echo "📦 Version Node.js installée :"
node -v
npm -v

# 3. Aller dans le dossier frontend du projet
cd /home/maeva_g/htdocs/node971/frontend

# 4. Installer les dépendances npm
echo "📦 Installation des dépendances React..."
npm install

# 5. Builder le projet React
echo "⚙️ Build de l'application React..."
npm run build

# 6. Copier les fichiers build dans le dossier public
echo "📂 Copie du build dans le dossier public (htdocs)..."
rm -rf /home/maeva_g/htdocs/node971/frontend/public
mkdir -p /home/maeva_g/htdocs/node971/frontend/public
cp -r dist/* /home/maeva_g/htdocs/node971/frontend/public

echo "✅ Frontend React compilé et déployé avec succès dans /frontend/public"


puts "Seeding Database..."
puts "Seeding Users..."

User.create!(username: "raokoss", email: "raokoss@email.com", password: "12345", avatar_url: "https://gravatar.com/avatar/4dc716dcc61ed6c377696b57581084f5?s=400&d=wavatar&r=x")


puts "Seeding Coins..."

Coin.create(name: "Ethereum", ticker: "ETH", last_price: 1270.93)
Coin.create(name: "BNB", ticker: "BNB", last_price: 272.21)
Coin.create(name: "Solana", ticker: "SOL", last_price: 13.11)
Coin.create(name: "Avalanche", ticker: "AVAX", last_price: 12.90)

puts "Seeding Wallets..."

Wallet.create(user_id: 1, coin_id: 1, quantity: 20)
Wallet.create(user_id: 1, coin_id: 2, quantity: 50)
Wallet.create(user_id: 1, coin_id: 3, quantity: 200)

puts "Seeding NFTs..."

Nft.create(name: "CyberPunks", rarity: 4, supply: 100, chain: "ETH", image_url: "https://i.seadn.io/gae/iIo0vm6cqiOaUwFI58-Rz61Watioc0GZ_SdhdcFJqgdYlQJNjjdzJ7-vodNEDJMG0ZJ-dE6yELuQfAJ6FzjpqtovU0bd3pLp1F1grg?auto=format&w=256)")
Nft.create(name: "Valhalla", rarity: 6, supply: 200, chain: "ETH", image_url: "https://i.seadn.io/gcs/files/d7936464d55988206c1b16c6929856f6.jpg?auto=format&w=256")

Nft.create(name: "Bored Yacht Club", rarity: 3, supply: 3000, chain: "ETH", image_url: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=256")

Nft.create(name: "Cities of the World", rarity: 2, supply: 5000, chain: "ETH", image_url: "https://i.seadn.io/gae/7xLLJP7jRxvUY-5zMo6OE6CRybsh6i2Cq7Wp6AsbLHUysMzQhBCB4UxLG5uButYDs7qFXaoKCGXkWEXJ2jtc3GbWYojCuyCKcNT_?auto=format&w=256")

puts "Done! :)"
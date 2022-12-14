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

Nft.create(name: "Valhalla", rarity: 6, supply: 200, chain: "ETH", image_url: "https://i.seadn.io/gae/bm82mm-LChXZ9bCfrVxtXLTjFL3NxtnsbQMdVAOGoRXq81HYIbYtXts6bIl05tgZEMQ2_G7FWT2WENiNIYZ14bPa0Pa4BpDNWDjdNQ?auto=format&w=256")

Nft.create(name: "Bored Yacht Club", rarity: 3, supply: 3000, chain: "ETH", image_url: "https://i.seadn.io/gae/Jf86KE6MWqAbTvYh9yWFPUUQ3lVNo3cblVP_U6NgRKTj55ysPIBhOVKss9vuBusHyOxkwaJxjUxtrDN2oA8NDfUFj4ERK7PZs-TwAyo?auto=format&w=256")

Nft.create(name: "Cities of the World", rarity: 2, supply: 5000, chain: "ETH", image_url: "https://i.seadn.io/gae/7xLLJP7jRxvUY-5zMo6OE6CRybsh6i2Cq7Wp6AsbLHUysMzQhBCB4UxLG5uButYDs7qFXaoKCGXkWEXJ2jtc3GbWYojCuyCKcNT_?auto=format&w=256")

Nft.create(name: "Vending Machine Tycoon", rarity: 4, supply: 100, chain: "ETH", image_url: "https://i.seadn.io/gcs/files/af5c62471dbce81b8c68c274e338ccb4.gif?auto=format&w=256")

Nft.create(name: "Shisero", rarity: 3, supply: 200, chain: "ETH", image_url: "https://i.seadn.io/gcs/files/c2ed683fd74558144e997e3bc9e7d51c.png?auto=format&w=256")

Nft.create(name: "KPR", rarity: 4, supply: 150, chain: "ETH", image_url: "https://i.seadn.io/gae/zqIbFVi6MxOL4AQSiphxgsGL3iqR61TlZ8mXmH0B2TRDlIWjjqt3dhWi65ccEgdcEvbthQEBgRg3njtQSQuhUHmG0HcQL_G_BpcF?auto=format&w=256")

Nft.create(name: "Lil Kami", rarity: 4, supply: 500, chain: "ETH", image_url: "https://i.seadn.io/gae/f2OPJ5nh13wnb8lJwscY6Nsz2s7n2RSsJt3S06JOepPfreVeJQ4uqfUaXYJmHtRsALmDMQVv9xlg0HQDSm75ZSZTBMEsFKGW0dn_bQ?auto=format&w=256")

Nft.create(name: "Ena Official", rarity: 3, supply: 250, chain: "ETH", image_url: "https://i.seadn.io/gae/f0haDG0VYviWMSjxOzEXd6_8ik6XRG8rGtpcqwSRdQap-eMsFzLY8aw5K8zuQaYHhXRIsu33Gk7Ea3PRnzEfSMORt_8CCreAV4kkwrw?auto=format&w=256")

Nft.create(name: "Claynosaurz", rarity: 5, supply: 300, chain: "SOL", image_url: "https://i.seadn.io/gae/e1HHGtQQyyNAQvCiZUt5_bSv_eZDQ8FCh2Nhsa5efFZxKUfBV1wgrj_W4wW1FhjUBb10NHfrmfmr_qgg2lB6uBshzZfpiWqvlrWa?auto=format&w=256")

Nft.create(name: "Sensei", rarity: 6, supply: 200, chain: "SOL", image_url: "https://i.seadn.io/gae/yrz0cvbYXJ_tRqXs_5r03S-lWfYPoNJYrviY7cAJdYeQKmT0_0b5xLyHlZjVmaRD2uRC8HNdr_c6p_V9pfna4SCvrbM3kWoDx_t9_g?auto=format&w=256")

Pricing.create(user_id: 1, nft_id: 1, price_nft: 0.0020)

puts "Done! :)"
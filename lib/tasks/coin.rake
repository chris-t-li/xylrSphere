namespace :coin do
  desc "saying hi to cron"
  task :get_coin_prices => [ :environment ] do
    ## Set up URL for Fetch Request ###
    url = URI("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest")
    http = Net:: HTTP.new(url.host, url.port)
    http.use_ssl = true

    auth = {"X-CMC_PRO_API_KEY": Rails.application.credentials.dig(:coin_market_cap)}

    ## Fetch Request ###
    request = Net::HTTP::Get.new(url, auth)
    request["accept"] = "application/json"
    # request["Authorization"] = Rails.application.credentials.dig(:coin_market_cap)
    
    ### Handle Response ###
    response = http.request(request)
    latest_crypto_price_data = JSON.parse(response.read_body)

    ### Create Coin Instances ###
    eth_coin = Coin.find_by(ticker: "ETH")

    eth_coin.update(
        last_price: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "ETH"}["quote"]["USD"]["price"] ,
        updated_at: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "ETH"}["last_updated"]
    )

    puts eth_coin

    bnb_coin = Coin.find_by(ticker: "BNB")

    bnb_coin.update(
        last_price: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "BNB"}["quote"]["USD"]["price"] ,
        updated_at: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "BNB"}["last_updated"]
    )

    puts bnb_coin
    
    sol_coin = Coin.find_by(ticker: "SOL")
    sol_coin.update(
        last_price: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "SOL"}["quote"]["USD"]["price"] ,
        updated_at: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "SOL"}["last_updated"]
    )

    puts sol_coin

    avax_coin = Coin.find_by(ticker: "AVAX")
    avax_coin.update(
        last_price: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "AVAX"}["quote"]["USD"]["price"] ,
        updated_at: 
            latest_crypto_price_data["data"].find{|c| c["symbol"] == "AVAX"}["last_updated"]
    )
  end

end

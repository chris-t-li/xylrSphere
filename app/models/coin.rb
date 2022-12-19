class Coin < ApplicationRecord
    has_many :pricing
    has_many :nfts, through: :pricing

    # Whenever Schedule (cron task)
    def get_coin_prices
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
        eth_coin = find_coin "ETH"
        eth_coin.Update(
            last_price: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "ETH"}["quote"]["USD"]["price"] ,
            updated_at: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "ETH"}["last_updated"] ,
        )

        puts eth_coin

        bnb_coin = find_coin "BNB"
        bnb_coin.Update(
            last_price: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "BNB"}["quote"]["USD"]["price"] ,
            updated_at: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "BNB"}["last_updated"] ,
        )

        puts bnb_coin
        
        sol_coin = find_coin "SOL"
        sol_coin.Update(
            last_price: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "SOL"}["quote"]["USD"]["price"] ,
            updated_at: 
                latest_crypto_price_data["data"].find{|c| c["symbol"] == "SOL"}["last_updated"] ,
        )

        puts sol_coin
    end

    def find_coin ticker
        Coin.find_by(ticker: ticker)
    end

end


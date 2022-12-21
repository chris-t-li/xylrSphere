set :output, "log/cron.log"

every 10.minute do
    rake 'coin:get_coin_prices'
end

every 10.minute do
    rake 'nft:simulate_prices'
end


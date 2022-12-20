set :output, "log/cron.log"

every 30.minute do
    rake 'coin:get_coin_prices'
end


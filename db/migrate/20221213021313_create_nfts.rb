class CreateNfts < ActiveRecord::Migration[7.0]
  def change
    create_table :nfts do |t|
      t.string :name
      t.string :image_url
      t.integer :rarity
      t.integer :supply
      t.string :chain
      t.boolean :on_market

      t.timestamps
    end
  end
end

+++
fragment = "stripe"
weight = 120
background = "secondary"

title = "Payment Fragment"
subtitle = "Doesn't work in demo"

post_url = "https://us-central1-syna-222118.cloudfunctions.net/function-1/charge"
stripe_token = "pk_test_36PckiAlsGm9KmHj9b034GAW"

product = "Example Product"

[[prices]]
  text = "10$"
  amount = "1000"
  currency = "usd"

[[prices]]
  text = "20$"
  amount = "2000"
  currency = "usd"

[[prices]]
  text = "30$"
  amount = "3000"
  currency = "usd"

[email]
  label = "Your email address"
+++

You can pay for the product by filling this form (provided by Stripe).

# Setup

Using node v20.11.0

Download and expand the `metaKV.sample100.txt` sample from https://observablehq.com/@1a1a11a/sieve-miss-ratio-plots

```
git clone https://github.com/kurtextrem/js-sieve.git
cd js-sieve
yarn install
yarn build
cd ..

git clone https://github.com/kurtextrem/mnemonist.git
cd mnemonist
npm install
cd ..

yarn install
yarn bench
```

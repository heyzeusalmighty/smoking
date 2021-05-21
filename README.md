# Smoking Time


### Setting up your SDR
Follow [this guide](https://www.nooelec.com/store/downloads/dl/file/id/72/product/294/nesdr_installation_manual_for_ubuntu.pdf)
You should really set up the user so you don't have to `sudo`.

Install `rtl_433` onto the box.  This is what we are using to read the SDR info from the Thermopro.

### Setting up the app
1. `nvm use`
2. `npm install`
3. copy the database: `cp db/temps.sample.db db/temps.db`
4. `npm start`
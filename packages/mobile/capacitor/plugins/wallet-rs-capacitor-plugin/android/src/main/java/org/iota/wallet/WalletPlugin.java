package org.iota.wallet;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.iota.types.*;
import org.iota.types.exceptions.WalletException;
import org.iota.types.ids.account.AccountIdentifier;
import org.iota.types.ids.account.AccountIndex;

import org.iota.Wallet;
import org.iota.types.AccountHandle;
import org.iota.types.ClientConfig;
import org.iota.types.CoinType;
import org.iota.types.WalletConfig;

@CapacitorPlugin(name = "WalletPlugin")
public class WalletPlugin extends Plugin {
    @PluginMethod
    public Wallet createAccountManager(options) {
        Wallet manager = new Wallet(options);
        return manager;
    }
}

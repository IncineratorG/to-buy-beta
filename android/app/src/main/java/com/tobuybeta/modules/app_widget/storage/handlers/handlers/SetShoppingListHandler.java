package com.tobuybeta.modules.app_widget.storage.handlers.handlers;

import android.content.Context;
import android.content.SharedPreferences;

import com.tobuybeta.modules.app_widget.common.handler.Handler;
import com.tobuybeta.modules.app_widget.common.product.Product;
import com.tobuybeta.modules.app_widget.storage.constants.StorageConstants;

import java.util.List;

/**
 * TODO: Add a class header comment
 */

public class SetShoppingListHandler implements Handler {
    private Context mContext;
    private String mListId;
    private String mListName;
    private List<Product> mProductsList;

    public SetShoppingListHandler(Context context,
                                  String listId,
                                  String listName,
                                  List<Product> productsList) {
        mContext = context;
        mListId = listId;
        mListName = listName;
        mProductsList = productsList;
    }

    @Override
    public Object handle() {
        if (mContext == null) {
            return false;
        }

        SharedPreferences.Editor editor = mContext
                .getSharedPreferences(StorageConstants.PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE)
                .edit();

//        editor.putBoolean(StorageConstants.PREFERENCES_WIDGET_ACTIVE_FIELD, mIsActive);

        editor.commit();

        return true;
    }
}

package com.tobuybeta.modules.app_widget.widget_models.model;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionResults;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;

/**
 * TODO: Add a class header comment
 */

public class WidgetModel {
    private Storage mStorage;
    private GeneralizedList mCurrentList;

    public WidgetModel(Context context) {
        mStorage = Storage.get();

        Action getShoppingListsAction = StorageActions.getShoppingListsAction(context);
        mStorage.execute(getShoppingListsAction);
        mCurrentList = StorageActionResults
                .getShoppingListsActionResult(getShoppingListsAction.result().get());
    }

    public String title() {
        return mCurrentList.title();
    }

    public GeneralizedList list() {
        return mCurrentList;
    }
}

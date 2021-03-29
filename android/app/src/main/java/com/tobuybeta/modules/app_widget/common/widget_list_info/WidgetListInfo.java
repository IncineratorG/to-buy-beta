package com.tobuybeta.modules.app_widget.common.widget_list_info;

import com.tobuybeta.modules.app_widget.module_constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;

/**
 * TODO: Add a class header comment
 */

public class WidgetListInfo {
    private int mWidgetId;
    private String mListId;
    private String mListType;

    public WidgetListInfo() {
        mListId = AppWidgetModuleConstants.common.EMPTY_ID;
        mWidgetId = Integer.parseInt(mListId);
        mListType = GeneralizedList.UNKNOWN;
    }

    public WidgetListInfo(int widgetId, String listId, String listType) {
        mWidgetId = widgetId;
        mListId = listId;
        mListType = listType;
    }

    public int widgetId() {
        return mWidgetId;
    }

    public String listId() {
        return mListId;
    }

    public String listType() {
        return mListType;
    }
}

package com.tobuybeta.modules.app_widget.common.generalized_list;

import androidx.arch.core.util.Function;

import java.util.List;

/**
 * TODO: Add a class header comment
 */

public class GeneralizedList {
    private String mTitle;
    private List<String> mList;
    private Function<String, String> mItemIdExtractor;
    private Function<String, String> mItemNameExtractor;

    public GeneralizedList(String title,
                           List<String> list,
                           Function<String, String> itemIdExtractor,
                           Function<String, String> itemNameExtractor) {
        mTitle = title;
        mList = list;
        mItemIdExtractor = itemIdExtractor;
        mItemNameExtractor = itemNameExtractor;
    }

    public int size() {
        return mList.size();
    }

    public String title() {
        return mTitle;
    }

    public String id(int index) {
        return mItemIdExtractor.apply(mList.get(index));
    }

    public String name(int index) {
        return mItemNameExtractor.apply(mList.get(index));
    }
}

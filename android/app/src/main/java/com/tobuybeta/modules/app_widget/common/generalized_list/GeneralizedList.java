package com.tobuybeta.modules.app_widget.common.generalized_list;

import androidx.arch.core.util.Function;

import java.util.ArrayList;
import java.util.List;

/**
 * TODO: Add a class header comment
 */

public class GeneralizedList {
    public static final String UNKNOWN = "UNKNOWN";
    public static final String ALL_SHOPPING_LISTS = "ALL_SHOPPING_LISTS";
    public static final String PRODUCTS_LIST = "PRODUCTS_LIST";

    private String mListType;
    private String mTitle;
    private List<String> mList;
    private Function<String, String> mItemIdExtractor;
    private Function<String, String> mItemNameExtractor;
    private boolean mIsEmpty;

    public GeneralizedList() {
        mTitle = "";
        mList = new ArrayList<>();
        mItemIdExtractor = (description) -> "";
        mItemNameExtractor = (description) -> "";
        mIsEmpty = true;
        mListType = UNKNOWN;
    }

    public GeneralizedList(String title,
                           List<String> list,
                           String listType,
                           Function<String, String> itemIdExtractor,
                           Function<String, String> itemNameExtractor) {
        mTitle = title;
        mList = list;
        mItemIdExtractor = itemIdExtractor;
        mItemNameExtractor = itemNameExtractor;
        mIsEmpty = false;
        if (listType.equalsIgnoreCase(ALL_SHOPPING_LISTS) || listType.equalsIgnoreCase(PRODUCTS_LIST)) {
            mListType = listType;
        } else {
            mListType = UNKNOWN;
        }
    }

    public boolean isEmpty() {
        return mIsEmpty;
    }

    public int size() {
        return mList.size();
    }

    public String listType() {
        return mListType;
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

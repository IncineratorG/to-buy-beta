package com.tobuybeta.modules.app_widget.common.generalized_list;

import androidx.arch.core.util.Function;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class GeneralizedList {
    public static final String UNKNOWN = "UNKNOWN";
    public static final String ALL_SHOPPING_LISTS = "ALL_SHOPPING_LISTS";
    public static final String PRODUCTS_LIST = "PRODUCTS_LIST";

    private String mListType;
    private String mListId;
    private String mTitle;
    private List<String> mList;
    private Function<String, String> mItemIdExtractor;
    private Function<String, String> mItemNameExtractor;
    private Function<String, String> mItemStatusExtractor;
    private boolean mIsEmpty;

    public GeneralizedList() {
        mTitle = "";
        mList = new ArrayList<>();
        mItemIdExtractor = (description) -> "";
        mItemNameExtractor = (description) -> "";
        mItemStatusExtractor = (description) -> "";
        mIsEmpty = true;
        mListType = UNKNOWN;
    }

    public GeneralizedList(String listId,
                           String title,
                           List<String> list,
                           String listType,
                           Function<String, String> itemIdExtractor,
                           Function<String, String> itemNameExtractor,
                           Function<String, String> itemStatusExtractor) {
        mListId = listId;
        mTitle = title;
        mList = list;
        mItemIdExtractor = itemIdExtractor;
        mItemNameExtractor = itemNameExtractor;
        mItemStatusExtractor = itemStatusExtractor;
        mIsEmpty = false;
        if (listType.equalsIgnoreCase(ALL_SHOPPING_LISTS) || listType.equalsIgnoreCase(PRODUCTS_LIST)) {
            mListType = listType;
        } else {
            mListType = UNKNOWN;
        }

        Collections.sort(mList, (str1, str2) -> {
            String str1Name = mItemNameExtractor.apply(str1);
            String str2Name = mItemNameExtractor.apply(str2);

            String str1Status = mItemStatusExtractor.apply(str1);
            String str2Status = mItemStatusExtractor.apply(str2);

            if (str1Status.equalsIgnoreCase(str2Status)) {
                return str1Name.compareTo(str2Name);
            }

            return str2Status.compareTo(str1Status);
        });
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

    public String listId() {
        return mListId;
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

    public String status(int index) {
        return mItemStatusExtractor.apply(mList.get(index));
    }
}

package com.tobuybeta.test_widget;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import com.tobuybeta.R;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.widget_models.WidgetModels;
import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;
import com.tobuybeta.test_widget.widget_intents.intents.WidgetIntents;

public class MyFactory implements RemoteViewsService.RemoteViewsFactory {
    private Context context;
    private int widgetID;

    MyFactory(Context ctx, Intent intent) {
        context = ctx;
        widgetID = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID);
    }

    @Override
    public void onCreate() {

    }

    @Override
    public int getCount() {
        return WidgetModels.get().getOrCreate(context, widgetID).list().size();
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public RemoteViews getLoadingView() {
        return null;
    }

    @Override
    public RemoteViews getViewAt(int position) {
        WidgetModel model = WidgetModels.get().getOrCreate(context, widgetID);

        String itemId = model.list().id(position);
        String itemName = model.list().name(position);
        int itemImageResourceId = R.drawable.checkmark_v2;
        String currentListType = model.list().listType();

        RemoteViews rView = new RemoteViews(context.getPackageName(), R.layout.item);
        rView.setTextViewText(R.id.tvItemText, itemName);
        rView.setImageViewResource(R.id.itemImageView, itemImageResourceId);

        if (currentListType.equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
            rView.setViewVisibility(R.id.itemImageView, View.VISIBLE);
        } else {
            rView.setViewVisibility(R.id.itemImageView, View.GONE);
        }

        Intent listItemPressIntent = WidgetIntents.onListItemPressFillInIntent(widgetID, itemId);
        rView.setOnClickFillInIntent(R.id.tvItemText, listItemPressIntent);

        Intent checkMarkPressIntent = WidgetIntents.onListItemCheckMarkPressFillInIntent(widgetID, itemId);
        rView.setOnClickFillInIntent(R.id.itemImageView, checkMarkPressIntent);

//        Intent itemClickIntent = new Intent();
//        itemClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_TYPE, currentListType);
//        itemClickIntent.putExtra(MyTestWidget.ITEM_IMAGE_CLICK, false);
//
//        rView.setOnClickFillInIntent(R.id.tvItemText, itemClickIntent);
//
//        Intent itemImageClickIntent = new Intent();
//        itemImageClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//        itemImageClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemImageClickIntent.putExtra(MyTestWidget.CLICKED_LIST_TYPE, currentListType);
//        itemImageClickIntent.putExtra(MyTestWidget.ITEM_IMAGE_CLICK, true);
//
//        rView.setOnClickFillInIntent(R.id.itemImageView, itemImageClickIntent);

        return rView;
    }
//    @Override
//    public RemoteViews getViewAt(int position) {
////        WidgetModel model = WidgetModels.get().getOrCreate(context, widgetID);
////
////        String itemId = model.list().id(position);
////        String itemName = model.list().name(position);
////        int itemImageResourceId = R.drawable.checkmark_v2;
////        String currentListType = model.list().listType();
//
//        RemoteViews rView = new RemoteViews(context.getPackageName(),
//                R.layout.item);
//        rView.setTextViewText(R.id.tvItemText, WidgetModels.get().getOrCreate(context, widgetID).list().name(position));
//        rView.setImageViewResource(R.id.itemImageView, R.drawable.checkmark_v2);
//
//        if (WidgetModels.get().getOrCreate(context, widgetID).list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
//            rView.setViewVisibility(R.id.itemImageView, View.VISIBLE);
//        } else {
//            rView.setViewVisibility(R.id.itemImageView, View.GONE);
//        }
//
//        String itemId = WidgetModels.get().getOrCreate(context, widgetID).list().id(position);
//
//        Intent itemClickIntent = new Intent();
//        itemClickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_TYPE, WidgetModels.get().getOrCreate(context, widgetID).list().listType());
//        itemClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//
//        rView.setOnClickFillInIntent(R.id.tvItemText, itemClickIntent);
//
//        // ===
//        Intent itemImageClickIntent = new Intent();
//        itemImageClickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
//        itemImageClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemImageClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//        itemImageClickIntent.putExtra(MyTestWidget.ITEM_IMAGE_CLICK, "TRUE");
//
//        rView.setOnClickFillInIntent(R.id.itemImageView, itemImageClickIntent);
//        // ===
//
//        return rView;
//    }
//    @Override
//    public RemoteViews getViewAt(int position) {
//        RemoteViews rView = new RemoteViews(context.getPackageName(),
//                R.layout.item);
////        rView.setTextViewText(R.id.tvItemText, data.get(position));
////        rView.setTextViewText(R.id.tvItemText, mProducts.get(position).getName());
//        rView.setTextViewText(R.id.tvItemText, WidgetModels.get().getOrCreate(context, widgetID).list().name(position));
//        rView.setImageViewResource(R.id.itemImageView, R.drawable.checkmark_v2);
//
//        if (WidgetModels.get().getOrCreate(context, widgetID).list().listType().equalsIgnoreCase(GeneralizedList.PRODUCTS_LIST)) {
//            rView.setViewVisibility(R.id.itemImageView, View.VISIBLE);
//        } else {
//            rView.setViewVisibility(R.id.itemImageView, View.GONE);
//        }
//
//        String itemId = WidgetModels.get().getOrCreate(context, widgetID).list().id(position);
//
//        Intent itemClickIntent = new Intent();
//        itemClickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemClickIntent.putExtra(MyTestWidget.CLICKED_LIST_TYPE, WidgetModels.get().getOrCreate(context, widgetID).list().listType());
//        itemClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//
//        rView.setOnClickFillInIntent(R.id.tvItemText, itemClickIntent);
//
//        // ===
//        Intent itemImageClickIntent = new Intent();
//        itemImageClickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
//        itemImageClickIntent.putExtra(MyTestWidget.CLICKED_LIST_ID, itemId);
//        itemImageClickIntent.putExtra(MyTestWidget.WIDGET_ID, widgetID);
//        itemImageClickIntent.putExtra(MyTestWidget.ITEM_IMAGE_CLICK, "TRUE");
//
//        rView.setOnClickFillInIntent(R.id.itemImageView, itemImageClickIntent);
//        // ===
//
//        return rView;
//    }

    @Override
    public int getViewTypeCount() {
        return 1;
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }

    @Override
    public void onDataSetChanged() {
//        mItemsList = WidgetModels.get().getOrCreate(context, widgetID).list();


//        mProducts = Storage.get().getProductsList(context);



//        mProducts.clear();
//
//        SharedPreferences sharedPreferences = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//        Set<String> productsSet = sharedPreferences.getStringSet("products", new HashSet<>());
//
//        List<String> productsList = new ArrayList<>(productsSet);
//        for (int i = 0; i < productsList.size(); ++i) {
//            String productString = productsList.get(i);
//
//            String productId = productString.substring(0, productString.indexOf(" "));
//            String productName = productString.substring(productString.indexOf(" " ) + 1);
//
//            mProducts.add(new Product(productId, productName));
//        }




//        data.clear();

//        SharedPreferences sharedPreferences = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//        Set<String> productsSet = sharedPreferences.getStringSet("products", new HashSet<>());
//
//        List<String> productsList = new ArrayList<>(productsSet);
//
//        String productsString = "";
//        for (int i = 0; i < productsList.size(); ++i) {
//            String productString = productsList.get(i);
//
//            String productId = productString.substring(0, productString.indexOf(" "));
//            String productName = productString.substring(productString.indexOf(" " ) + 1);
//
//            productsString = productsString + productId + " - " + productName + "\n";
//        }


//        for (int i = counter; i < counter + 1; i++) {
//            data.add("Item " + i);
//        }
//        counter = counter + 1;

//        data.clear();
//        data.add(sdf.format(new Date(System.currentTimeMillis())));
//        data.add(String.valueOf(hashCode()));
//        data.add(String.valueOf(widgetID));
//        for (int i = 3; i < 15; i++) {
//            data.add("Item " + i);
//        }
    }

    @Override
    public void onDestroy() {

    }



//    ArrayList<String> data;
//    Context context;
//    SimpleDateFormat sdf;
//    int widgetID;
//
//    MyFactory(Context ctx, Intent intent) {
//        context = ctx;
//        sdf = new SimpleDateFormat("HH:mm:ss");
//        widgetID = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID,
//                AppWidgetManager.INVALID_APPWIDGET_ID);
//    }
//
//    @Override
//    public void onCreate() {
//        data = new ArrayList<String>();
//    }
//
//    @Override
//    public int getCount() {
//        return data.size();
//    }
//
//    @Override
//    public long getItemId(int position) {
//        return position;
//    }
//
//    @Override
//    public RemoteViews getLoadingView() {
//        return null;
//    }
//
//    @Override
//    public RemoteViews getViewAt(int position) {
//        RemoteViews rView = new RemoteViews(context.getPackageName(),
//                R.layout.item);
//        rView.setTextViewText(R.id.tvItemText, data.get(position));
//
//        Intent clickIntent = new Intent();
//        clickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
//        rView.setOnClickFillInIntent(R.id.tvItemText, clickIntent);
//
//        return rView;
//    }
//
//    @Override
//    public int getViewTypeCount() {
//        return 1;
//    }
//
//    @Override
//    public boolean hasStableIds() {
//        return true;
//    }
//
//    @Override
//    public void onDataSetChanged() {
//        data.clear();
//        data.add(sdf.format(new Date(System.currentTimeMillis())));
//        data.add(String.valueOf(hashCode()));
//        data.add(String.valueOf(widgetID));
//        for (int i = 3; i < 15; i++) {
//            data.add("Item " + i);
//        }
//    }
//
//    @Override
//    public void onDestroy() {
//
//    }
}

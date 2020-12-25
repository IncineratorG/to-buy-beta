package com.tobuybeta.test_widget;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;
import android.widget.Toast;

import com.tobuybeta.R;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * TODO: Add a class header comment
 */

public class MyFactory implements RemoteViewsService.RemoteViewsFactory {
    ArrayList<String> data;
    Context context;
    SimpleDateFormat sdf;
    int widgetID;
    int counter;

    private List<Product> mProducts;

    MyFactory(Context ctx, Intent intent) {
        context = ctx;
        sdf = new SimpleDateFormat("HH:mm:ss");
        widgetID = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID);

        mProducts = new ArrayList<>();
    }

    @Override
    public void onCreate() {
        mProducts = AppWidgetSharedShoppingList.get().getProductsList(context);

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



//        data = new ArrayList<String>();
////        data.clear();
//        data.add(sdf.format(new Date(System.currentTimeMillis())));
//        data.add(String.valueOf(hashCode()));
//        data.add(String.valueOf(widgetID));
//
//        counter = 3;
//        for (int i = counter; i < counter + 1; i++) {
//            data.add("Item " + i);
//        }
//        counter = counter + 1;
    }

    @Override
    public int getCount() {
        return mProducts.size();
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
        RemoteViews rView = new RemoteViews(context.getPackageName(),
                R.layout.item);
//        rView.setTextViewText(R.id.tvItemText, data.get(position));
        rView.setTextViewText(R.id.tvItemText, mProducts.get(position).getName());

        Intent clickIntent = new Intent();
        clickIntent.putExtra(MyTestWidget.ITEM_POSITION, position);
        rView.setOnClickFillInIntent(R.id.tvItemText, clickIntent);

        return rView;
    }

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
        mProducts = AppWidgetSharedShoppingList.get().getProductsList(context);

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

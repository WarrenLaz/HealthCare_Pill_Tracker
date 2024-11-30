import pandas

dataflist=[]
for i in range (1,8):
    dataflist.append(pandas.read_csv('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/db_rep/DataSetMigration/ProductOverview_'+str(i)+'.csv'))


#print(dataframe)
combinedf = pandas.concat(dataflist,ignore_index=True)
print(combinedf['Supplement Form [LanguaL]'].value_counts())

#print(pandas.read_csv('/Users/warren_lazarraga/Programming_projects/HealthCare_Pill_Tracker/db_rep/DataSetMigration/Products.csv')['Form'].value_counts())
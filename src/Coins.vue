<template>
    <v-container>
        <div class="coins">
            <!--            <h1>Таблица данных</h1>-->

            <v-simple-table
                    :dense="dense"
                    :fixed-header="fixedHeader"
                    :height="height"
                    width="100%"
                    class="borderR"
            >
                <!--                    class="theader"-->
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Price</th>
                        <!--                            <th style="width: 2%" class="text-left"></th>-->
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">MarketCap</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">VWAP</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Supply</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Volume (24Hr)</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Change (24Hr)</th>
                    </tr>
                    </thead>
                    <vue-custom-scrollbar class="scroll-area ps" :settings="settings" @ps-scroll-y="scrollHanle">
                        <tbody>
                        <!--<tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>-->

                        <tr v-for="item in dataCoins" :key="item.rank">
                            <td>{{ item.rank }}</td>
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-xs-left">{{ item.priceUsd }}</td>
                            <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.marketCapUsd }}</td>
                            <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.vwap24Hr }}</td>
                            <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.supply }}</td>
                            <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.volumeUsd24Hr }}</td>
                            <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.changePercent24Hr }}
                            </td>
                        </tr>
                        </tbody>
                    </vue-custom-scrollbar>
                </template>
            </v-simple-table>

            <!-- <v-row>
                 <v-col cols="12" md="6">
                     <v-text-field
                             v-model="height"
                             class="mx-4"
                             label="Height - px"
                             max="500"
                             min="1"
                             step="1"
                             style="width: 125px"
                             type="number"
                             @keydown="false"
                     ></v-text-field>
                 </v-col>
                 &lt;!&ndash;<v-col cols="6" md="3">
                     <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
                 </v-col>
                 <v-col cols="6" md="3">
                     <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
                 </v-col>&ndash;&gt;
             </v-row>-->

            <!--<ul >
                <li v-for="item in dataCoins" :key="item.rang">{{item.name}}</li>
            </ul>-->
            <!--            <input oninput="this.value = this.value.replace(/[^\d.,]/g, '').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').trim();" type="text" id="i" placeholder="Сумма"><label for="i">руб</label>-->

            <h2>Price bitcoin: {{changePrice.bitcoin}}</h2>
            <h2>All price : {{changePrice}}</h2>

        </div>
        <!--        ///////////////////////////////-->
        <!--        :custom-filter="filterOnlyCapsText"-->
        <!-- <v-data-table
                 :items="dataCoins"
                 :items-per-page="15"
                 class="elevation-1"
                 hide-default-footer
                 hide-default-header
         >

             <template #header>
                 <tr>
 &lt;!&ndash;                    <td></td>&ndash;&gt;
                     <td class="text-xs-right">Rank</td>
                     <td class="text-xs-right">Name</td>
                     <td class="text-xs-right">Price</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">MarketCap</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">VWAP</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">Supply</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">Volume (24Hr)</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">Change (24Hr)</td>
 &lt;!&ndash;                    <td class="text-xs-right" v-if="!$vuetify.breakpoint.mdAndDown">Change (24Hr)</td>&ndash;&gt;
                 </tr>
             </template>
             <template #body="{ items }">
                 <tr v-for="item in items" :key="item.id">
                     <td>{{ item.rank }}</td>
                     <td class="text-xs-right">{{ item.name }}</td>
                     <td class="text-xs-right">{{ item.priceUsd }}</td>
 &lt;!&ndash;                    <td class="text-xs-right" v-if="!$vuetify.breakpoint.smAndDown">{{ item.marketCapUsd }}</td>&ndash;&gt;
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.marketCapUsd }}</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.vwap24Hr }}</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.supply }}</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.volumeUsd24Hr }}</td>
                     <td class="text-xs-right" v-if="!$vuetify.breakpoint.xsOnly">{{ item.changePercent24Hr }}</td>
                 </tr>
             </template>
         </v-data-table>

 -->

        <!--<h2>{{setTime}}</h2>-->


    </v-container>
</template>

<script>

    import axios from 'axios'
    import vueCustomScrollbar from 'vue-custom-scrollbar'

    export default {
        name: "Coins",
        components: {
            vueCustomScrollbar,
        },
        data() {
            return {
                settings: {
                    maxScrollbarLength: 60,
                    suppressScrollX: true
                },
                dense: false,
                fixedHeader: true,
                height: 700,
                headers: [
                    {
                        text: 'Rank',
                        align: 'left',
                        sortable: false,
                        value: 'rank',
                        width: '3%'
                    },
                    {align: 'left', text: 'Name', value: 'name', width: '1%'},
                    {align: 'left', text: 'Price', value: 'priceUsd', width: '1%'},
                    {align: 'left', text: 'MarketCap', value: 'marketCapUsd', width: '1%'},
                    {align: 'left', text: 'VWAP', value: 'vwap24Hr', width: '1%'},
                    {align: 'left', text: 'Supply', value: 'supply', width: '1%'},
                    {align: 'left', text: 'Volume (24Hr)', value: 'volumeUsd24Hr', width: '1%'},
                    {align: 'left', text: 'Change (24Hr)', value: 'changePercent24Hr', width: '1%'},
                ],
                dataCoins: [],
                changePrice: '',
            }
        },
        methods: {
            scrollHanle(evt) {
                console.log(evt)
            },
            /*filterOnlyCapsText (value, search) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },*/
            filterData(val) {
                if (val >= 1000000000) {
                    // console.log('val - ', val);
                    // console.log('Answer',(val/1000000000)+'b');
                    return '$' + ((val / 1000000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'b';
                }
                if (val >= 1000000) {
                    return '$' + ((val / 1000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'm';
                }

                return '$' + (val.toFixed(2)).toLocaleString("en-US").replace(/\s/, '.');
            },
            filterSupplay(val) {
                if (val >= 1000000000) {
                    // console.log('Answer',(val/1000000000)+'b');
                    return ((val / 1000000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'b';
                }
                if (val >= 1000000) {
                    return ((val / 1000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'm';
                }

                return '$' + (val.toFixed(2)).toLocaleString("en-US").replace(/\s/, '.');
            },
            async changePriceAllTime() {
                console.log('111111111this.changePrice.bitcoin - ', this.changePrice);
                // this.changePriceAllTime(this.changePrice);
                // return 'Slava good'
            }
        },
        computed: {
            changeArr() {
                // this.changePrice.filter(item => console.log('Computed item - ', item));
                /*  for(let item of this.changePrice){
                      console.log('11111111111item - ', item);
                  }
                  return 'Hy';*/
                console.log('111111111this.changePrice.bitcoin - ', this.changePrice);
                return this.changePrice;
            }
        },
        async created() {

            // setInterval(() => console.log('Это сет интервал каждые 5 сек - '), 5000);

            const respons = await axios.get('https://api.coincap.io/v2/assets');

            if (respons.status === 200 && respons.data) {
                // console.log('Respons - ', respons.data.data);
                // return this.dataCoins = respons.data.data;

                this.dataCoins = respons.data.data.filter(item => item.rank <= 15);
                console.log('Filter - ', this.dataCoins);
////////////////////////////////////////////////////////////////////////
//                 Приведение все к нижнему регистру

                this.dataCoins.forEach(item => {
                    item.name = item.name.toLowerCase();
                    return item;
                });
                console.log('newSD - ', this.dataCoins);

                ////////////////////////////////////////////////////////////////////

                // console.log('respons.data.data - ', respons.data.data);
                let coin = this.dataCoins.map(item => item.name);


                // console.log('coin - ', encodeURIComponent(coin.join()));

                // this.dataCoins.forEach(item => item.marketCapUsd = (+item.marketCapUsd).toLocaleString("ru-RU").replace(/\s/,'.'));

                // WebSocket start ///////////////////////////////////////////////////////////////////

                /////////////////////////
                // Замена без регулярок
                var str = 'Яблоки круглые и (яблоки сочные)';
                console.log(str.split(' ').join('-').split('(').join('').split(')').join(''));


                //////////////////

                let re = / /g; // Флаг g - глобальный поиск совпадений по всей строке
                // var str = 'Яблоки круглые и яблоки сочные';
                // var newstr = str.replace(re, '-');

                // console.log(newstr);

                let coinMani = coin.join().replace(re, '-').toLowerCase();

                console.log('coin replace - ', coinMani);

                // const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');
                // encodeURIComponent()

                // const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${encodeURIComponent(Bitcoin SV)}`);

                // const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

                const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinMani}`);

                // console.log('pricesWs - ', pricesWs);

                let qw = this;

                pricesWs.onmessage = function (msg) {

                    console.log('JSON - ', JSON.parse(msg.data));

                    qw.changePrice = JSON.parse(msg.data);

                };

                // this.changePrice = qw;
                console.log('This is another this', this.changePrice);
                // this.changePrice.forEach(item => console.log('item -', item));


                //WebSocket end   ////////////////////////////////////////////////////////////////////////////////

                this.dataCoins.forEach(item => {
                    item.priceUsd = this.filterData(+item.priceUsd);
                    item.marketCapUsd = this.filterData(+item.marketCapUsd);
                    item.vwap24Hr = this.filterData(+item.vwap24Hr);
                    item.supply = this.filterSupplay(+item.supply);
                    item.volumeUsd24Hr = this.filterData(+item.volumeUsd24Hr);
                    item.changePercent24Hr = this.filterData(+item.changePercent24Hr);
                });
                // this.changeArr;
                return this.dataCoins

            } else {
                throw new Error('Сервер не доступен')
            }

        }

    }
</script>

<style scoped>
    .borderR {
        position: relative;
        border: 1px solid black;
        max-width: 850px;
        /*max-width: 900px;*/
        margin: 20px auto;
        border-radius: 5px;
    }

    /*.theader{
        position: relative;
        border: 1px solid red;
    }*/
    .scroll-area {
        /* display: flex;
         flex-direction: column;
         justify-content: space-between;*/
        position: absolute;
        top: 50px;
        left: 0;
        /*margin: auto;*/
        width: 100%;
        height: 600px;
        /*border: 1px solid red;*/
    }

    th {
        width: 10%;
    }

    td {
        /*width: 20%;*/
        width: 10%;
    }

    /*
        table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
             padding: 0 50px
         }*/
</style>
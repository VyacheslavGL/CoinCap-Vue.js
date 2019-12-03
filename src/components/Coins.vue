<template>
    <v-container>
        <div class="coins">
            <v-simple-table
                    :dense="dense"
                    :fixed-header="fixedHeader"
                    :height="height"
                    width="100%"
                    class="central_black"
            >
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Price</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">MarketCap</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">VWAP</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Supply</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Volume (24Hr)</th>
                        <th class="text-left" v-if="!$vuetify.breakpoint.xsOnly">Change (24Hr)</th>
                    </tr>
                    </thead>
                    <!--                    <vue-custom-scrollbar class="scroll-area ps" :settings="settings" @ps-scroll-y="scrollHanle">-->
                    <vue-custom-scrollbar class="scroll-area ps" :settings="settings">
                        <tbody>
                        <tr v-for="item in WebSocket_price" :key="item.rank" :class="{'color_row_light-grey' : item.change}">
                            <td>{{ item.rank }}</td>
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-xs-left ">{{ item.priceUsd }}</td>
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

        </div>
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

                    },
                    {align: 'left', text: 'Name', value: 'name'},
                    {align: 'left', text: 'Price', value: 'priceUsd'},
                    {align: 'left', text: 'MarketCap', value: 'marketCapUsd'},
                    {align: 'left', text: 'VWAP', value: 'vwap24Hr'},
                    {align: 'left', text: 'Supply', value: 'supply'},
                    {align: 'left', text: 'Volume (24Hr)', value: 'volumeUsd24Hr'},
                    {align: 'left', text: 'Change (24Hr)', value: 'changePercent24Hr'},
                ],
                data_coins_from_api: [],
                new_price_from_web_socket:'',
            }
        },
        methods: {
            /*   scrollHanle(evt) {
                   console.log(evt)
               },*/
            filter_data_table(val) {
                if (val >= 1000000000) {
                    return '$' + ((val / 1000000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'b';
                }
                if (val >= 1000000) {
                    return '$' + ((val / 1000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'm';
                }
                return '$' + (val.toFixed(2)).toLocaleString("en-US").replace(/\s/, '.');
            },
            filter_supply_table(val) {
                if (val >= 1000000000) {
                    return ((val / 1000000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'b';
                }
                if (val >= 1000000) {
                    return ((val / 1000000).toFixed(2)).toLocaleString("en-US").replace(/\s/, ',') + 'm';
                }
                return '$' + (val.toFixed(2)).toLocaleString("en-US").replace(/\s/, '.');
            },

        },
        computed: {
            WebSocket_price() {
                let coins_from_api = this.data_coins_from_api;
                if (this.new_price_from_web_socket) {
                    for (let key in this.new_price_from_web_socket) {
                        coins_from_api.forEach(item => {
                                if (key === item.id) {
                                    item.priceUsd = this.filter_data_table(+this.new_price_from_web_socket[key]);
                                    item.change = true;
                                    return;

                                }
                                item.change = false;
                            }
                        );
                    }
                }

                return coins_from_api;
            },

        },
        async created() {

            const respons = await axios.get('https://api.coincap.io/v2/assets');

            if (respons.status === 200 && respons.data) {
                this.data_coins_from_api = respons.data.data.filter(item => item.rank <= 15);

                let coins_name = this.data_coins_from_api.map(item => item.id);

                // WebSocket start

                let coins_name_for_web_socket = coins_name.join();

                const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coins_name_for_web_socket}`);

                let self = this;

                pricesWs.onmessage = function (msg) {

                    self.new_price_from_web_socket = JSON.parse(msg.data);

                };

                //WebSocket end

                this.data_coins_from_api.forEach(item => {
                    item.priceUsd = this.filter_data_table(+item.priceUsd);
                    item.marketCapUsd = this.filter_data_table(+item.marketCapUsd);
                    item.vwap24Hr = this.filter_data_table(+item.vwap24Hr);
                    item.supply = this.filter_supply_table(+item.supply);
                    item.volumeUsd24Hr = this.filter_data_table(+item.volumeUsd24Hr);
                    item.changePercent24Hr = this.filter_data_table(+item.changePercent24Hr);
                });
                // console.info('Любишь заглядывать в консоль? ахаха прекрати.');
                // console.log('%c ', 'font-size:470px; background:url(https://pbs.twimg.com/profile_images/997741699060322306/IlS0xVcD_400x400.jpg) no-repeat;');
                return this.data_coins_from_api

            } else {
                throw new Error('Сервер не доступен')
            }

        }

    }
</script>

<style scoped>
    .central_black {
        position: relative;
        border: 1px solid black;
        max-width: 1200px;
        margin: 20px auto;
        border-radius: 5px;
    }

    .scroll-area {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        height: 600px;
    }

    th {
        width: 10%;
    }

    td {
        width: 10%;
    }

    .color_row_light-grey {
        background-color: #c6c6be;
    }
</style>
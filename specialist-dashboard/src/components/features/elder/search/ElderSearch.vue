<script>
import ElderRow from './ElderRow';
import PersonForm from '@/components/features/person/PersonForm'
import { buildSearchByConditionQuery } from '@/graphql/utils/queryBuilder'
import { AUTO_COMPLETE_PERSON_OF_TYPE } from '@/graphql/queries/person'
import PersonTypes from '@/constants/enums/PersonTypes'
import _ from 'lodash'
export default {
    components: { ElderRow, PersonForm },
	props: {
		callToActionLabel: String,
    },
	data: () => ({
        elders: [],
        searchTriggered: false,
        searchInProgress: false,
        createElderMode: false,
        elderToCreate: {},
        searchTerm: '',
        elderType: PersonTypes.elder
	}),
    methods: {
        onElderPick(elder){
            this.$emit('select', elder);
        },
        searchElder: _.debounce(function() {
            this.searchInProgress = true;
            this.searchTriggered = true;
            const variables = constructSearchQuery(this.searchTerm);
            this.$apollo.mutate({
             mutation: AUTO_COMPLETE_PERSON_OF_TYPE,
             variables,
        })
        .then(this.updateResults)
        .finally(this.searchDone)
        }, 600),
        updateResults,
        searchDone,
    }
};

function updateResults(results){
    this.elders = results.data.getPersonByCondition.people;
}

function searchDone(){
    this.searchInProgress = false;
}

function constructSearchQuery(textQuery){
    const query  = {
        and: [
            { or: [
                {firstName: { like: `%${textQuery}%` } },
                {lastName:  { like: `%${textQuery}%` }},
                {phoneNumber:  { like: `%${textQuery}%` }},
            ] },
            { type: { eq: PersonTypes.elder.toLowerCase() } },
        ]
    };
    return buildSearchByConditionQuery(query);
}
</script>
<template>
<div>
    <b-row v-if="!createElderMode">
        <b-col class="flex-column search-wrapper d-flex">
        <header class="w-100">
            <b-form-input type="text" @keydown="searchElder()" v-model="searchTerm" placeholder="הזן שם או טלפון של הזקן/נה" @input="searchElder()"></b-form-input>
        </header>
        <section v-if="searchTriggered">
            <b-row>
                <b-col class="d-flex justify-content-between">
                    <h4> 
                        <span v-if="!this.searchInProgress">תוצאות ({{elders.length}})</span>
                        <span v-if="this.searchInProgress">מחפש...</span>
                    </h4>
                    <b-button :variant="'link'" @click="createElderMode = true">פניה עבור זקן חדש</b-button>
                </b-col>
            </b-row>
            <section class="results-container">
                <virtual-scroller
                    v-if="elders.length"
                    class="scroller"
                    :items="elders"
                    item-height="100">
                    <template slot-scope="props">
                        <ElderRow class="item" :callToAction="callToActionLabel" :onPick="onElderPick" :elder="props.item"></ElderRow>
                    </template>
                </virtual-scroller>
                <p v-if="!elders.length && !this.searchInProgress">
                    לא נמצאו תוצאות לפי הערכים שהקלדת.
                    רשום את הזקן ולאר מכן, המשך לפתיחת פניה.
                </p>
            </section>
        </section>

        </b-col>
    </b-row>
    <b-row v-if="createElderMode" class="m-0">
        <PersonForm :personType="elderType" @cancel="createElderMode = false" @save="onElderPick"/>
    </b-row>
</div>
</template>
<style scoped>
.search-wrapper{
    min-height: 350px;
}
.results-container{
    height: 100%;;
    flex: 1;
}
</style>


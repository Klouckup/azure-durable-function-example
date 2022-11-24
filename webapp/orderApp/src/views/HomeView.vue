<script setup>
import { ref, onMounted } from 'vue'
import { API } from '../api/api'
const selectedDish = ref('PZ')
const amount = ref(1)
const isApproved = ref(false)
const isOrdered = ref(false)
const hasErrors = ref(false)
const errors = ref([])
const clientId = ref('')

const orderList = ref([])

const items = ref([
  {
    id: 'PZ',
    name: 'Pizza'
  },
  {
    id: 'NE',
    name: 'Nudeln mit Ente'
  },
  {
    id: 'CB',
    name: 'Cheeseburger'
  },
  {
    id: 'FW',
    name: 'Falafel-Wrap'
  }
]);

onMounted(() => {
  clientId.value = API.getClientId();
});

const order = () => {
  isOrdered.value = true;
  hasErrors.value = false;
  API.registerOrder({
    id: clientId.value,
    items: orderList.value
  }).then((e) => {
    if (e.statusQueryGetUri === undefined) {
      console.log("error", e);
      return;
    }
    let statusUrl = e.statusQueryGetUri;
    setTimeout(pollStatus, 2000, statusUrl);
  });
};

const pollStatus = (url) => {
  API.polling(url).then((res) => {
    console.log(url);
    if (res.runtimeStatus === "Completed") {
      console.log(res.output);
      if (res.output.errors) {
        hasErrors.value = true;
        isOrdered.value = false;
        errors.value = res.output.errors;
      } else {
        isApproved.value = true;
      }
    } else {
      setTimeout(pollStatus, 2000, url);
    }
  });
};

const checkAmount = (e) => {
  if (e.target.value < 1) {
    amount.value = 1;
  }
  if (e.target.value > 50) {
    amount.value = 50;
  }
};

const addItem = () => {
  let dishItem = items.value.filter(x => x.id === selectedDish.value);
  let item = orderList.value.filter(x => x.id === selectedDish.value);
  if (item.length === 0) {
    orderList.value.push({
      id: selectedDish.value,
      name: dishItem[0].name,
      quantity: amount.value
    });
  } else {
    item[0].quantity += amount.value;
  }
};

const removeFromList = (id) => {
  orderList.value = orderList.value.filter(x => x.id !== id);
};

</script>

<template>
  <main>
    <div class="container mx-auto" v-if="!isApproved">
      <div class="mx-auto pt-4">
        <h1 class="text-white text-bold mb-4 font-bold">Product Selection</h1>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Product</label>
        <select id="countries" v-model="selectedDish" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="item in items" :value="item.id" >{{ item.name }}</option>
        </select>
        <div class="mt-4">
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <input type="number" v-model="amount" @change="checkAmount" id="amount" min="1" max="50" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required>
        </div>
        <button @click="addItem()" type="button" class="mt-4 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add</button>
      </div>
      <hr class="mt-4 mb-4" />
      <div class="mx-auto text-white">
        <h1 class="mt-2 mb-2 font-bold">Order List</h1>
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          <li v-for="order in orderList" class="pb-3 sm:pb-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <button @click="removeFromList(order.id)" type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">X</button>
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {{ order.name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{ order.quantity }} Stk.
                  </div>
              </div>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-between">
          <button v-if="!isOrdered" type="button" @click="order()" class="mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            Buy now
          </button>
          <div class="flex gap-2 text-white" v-if="isOrdered">
            <p>Status: {{isApproved ? "Approved" : "Pending"}}</p>
            <div role="status">
                <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-if="hasErrors">
          <p class="text-red-500" v-for="mess in errors">{{mess.error}}</p>
        </div>
    </div>
    <div class="container mx-auto" v-else>
      <h1 class="text-white">
        Order Confirmed!
      </h1>
    </div>
  </main>
</template>

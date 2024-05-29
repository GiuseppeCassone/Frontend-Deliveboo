import { reactive } from "vue";


export const store = reactive({

    currentDish: {},
    CartItems: [],
    totalCartPrice: 0,
    currentIdRestaurant: null,

    lastOrder: [],

    /* METODI PER LA GESTIONE DEL CARRELLO */
    // metodo che aggiunge un singolo piatto già presente nel carrello
    addActualDish(index) {
        // aggiorno la quantità di quel piatto nel carrello
        this.CartItems[index].itemQuantity++;
        // aggiorno il prezzo totale dello stesso piatto all'interno del carello
        this.CartItems[index].ItemTotalPrice += this.CartItems[index].itemPrice;
        this.CartItems[index].ItemTotalPrice = Number(this.CartItems[index].ItemTotalPrice.toFixed(2));
        // aggiorno il prezzo totale del carrello
        this.addToTotalCart(this.CartItems[index]);

        localStorage.setItem('totalCartPrice', this.totalCartPrice);
        localStorage.setItem('CartItems', JSON.stringify(this.CartItems));
    },

    // metodo che rimuove un singolo piatto già presente nel carrello
    removeActualDish(index) {
        // controllo se la quantità di quel piatto nel carrello
        // è maggiore di 1
        if (this.CartItems[index].itemQuantity > 1) {
            // aggiorno la quantità di quel piatto nel carrello
            this.CartItems[index].itemQuantity--;
            // aggiorno il prezzo totale dello stesso piatto all'interno del carello
            this.CartItems[index].ItemTotalPrice -= this.CartItems[index].itemPrice;
            this.CartItems[index].ItemTotalPrice = Number(this.CartItems[index].ItemTotalPrice.toFixed(2));
            // aggiorno il prezzo totale del carrello
            this.totalCartPrice -= Number(this.CartItems[index].itemPrice);
        } else {
            // altrimenti rimuovo quel piatto dal carrello
            this.removeItem(index);
        }

        // aggiorno il prezzo totale nel localstorage
        localStorage.setItem('totalCartPrice', this.totalCartPrice);
        // aggiorno il carrello nel localstorage
        localStorage.setItem('CartItems', JSON.stringify(this.CartItems));
    },

    // metodo che rimuove tutta la quantità di uno stesso piatto
    removeItem(index) {
        // console.log(this.CartItems[index])
        // aggiorno il prezzo totale del carrello
        this.removeFromToTotalCart(index);
        this.CartItems.splice(index, 1);
        // aggiorno il carrello nel localstorage
        localStorage.setItem('CartItems', JSON.stringify(this.CartItems));
    },

    // metodo che aggiorna il prezzo totale nel carrello quando viene rimosso un piatto
    removeFromToTotalCart(index) {
        // this.totalCartPrice -= Number(this.CartItems[index].ItemTotalPrice);
        if (this.CartItems.length > 0 && index < this.CartItems.length) {
            this.totalCartPrice -= Number(this.CartItems[index].ItemTotalPrice);
            if (this.totalCartPrice < 0) {
                this.totalCartPrice = 0; // Resetto il prezzo totale a 0 se diventa negativo
            }
        }

        // aggiorno il prezzo totale nel localstorage
        localStorage.setItem('totalCartPrice', this.totalCartPrice);
    },

    // metodo che aggiorna il prezzo totale nel carrello quando viene aggiunto un piatto
    addToTotalCart(item) {
        this.totalCartPrice += Number(item.itemPrice);
        this.totalCartPrice = Number(this.totalCartPrice.toFixed(2));

        // aggiorno il carrello nel localstorage
        localStorage.setItem('totalCartPrice', this.totalCartPrice);
    },

    // metodo che svuota il carrello quando l'utente effettua il pagamento
    clearCart() {
        this.CartItems.splice(0, this.CartItems.length);
        // aggiorno il carrello nel localstorage
        localStorage.setItem('CartItems', this.CartItems);
        this.totalCartPrice = 0;
        // aggiorno il prezzo totale nel localstorage
        localStorage.setItem('totalCartPrice', 0);
    },

})
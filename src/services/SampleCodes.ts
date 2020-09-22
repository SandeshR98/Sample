import { sp } from "@pnp/sp/presets/all";

export class SampleCodes {
    //Get All
    public async getAll(listName: string): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            sp.web.lists.getByTitle(listName).items.getAll()
                .then((results: any) => {
                    resolve(results); console.log(results);
                }, (error: any) => {
                    reject("error");
                });
        });
    }

    //Get Item by Id
    public async getItemById(listName: string, itemId: any): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            sp.web.lists.getByTitle(listName).items.getById(itemId).get()
                .then((results: any) => {
                    resolve(results); console.log(results);
                }, (error: any) => {
                    reject("error");
                });
        });
    }

    //Update Item
    public async update(listName: string, itemId: any, data: any): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            sp.web.lists.getByTitle(listName).items.getById(itemId).update(data)
                .then((results: any) => {
                    resolve(results); console.log(results);
                }, (error: any) => {
                    reject("error");
                });
        });
    }

    //Delete Item
    public async delete(listName: string, itemId: any): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            sp.web.lists.getByTitle(listName).items.getById(itemId).delete()
                .then((results: any) => {
                    resolve(results); console.log(results);
                }, (error: any) => {
                    reject("error");
                });
        });
    }

    //Create Item
    public async createItem(listName: string, data: any): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            console.log(data);
            sp.web.lists
                .getByTitle(listName)//list name comes here
                .items.add(data)
                .then((results: any) => { resolve(results); console.log(results) }, (error: any) => {
                    reject("error");
                })

        });
    }
}
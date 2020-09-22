import * as React from 'react';
import { sp } from "@pnp/sp/presets/all";
import { ISimpleSPFxFormProps } from '../model/ISimpleSPFxFormProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DatePicker, mergeStyleSets } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react';
import { ISimpleSPFxFormState } from '../model/ISimpleSPFxFormState';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};
const controlClass = mergeStyleSets({
    control: {
        margin: '0 0 15px 0',
        maxWidth: '300px',
    },
});
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
};
const options: IDropdownOption[] = [
    { key: 'genderHeader', text: 'Gender', itemType: DropdownMenuItemType.Header },
    { key: 'M', text: 'Male' },
    { key: 'F', text: 'Female' },
    { key: 'O', text: 'Other' },

];
export default class SimpleSPFxForm extends React.Component<ISimpleSPFxFormProps, ISimpleSPFxFormState> {

    constructor(props: ISimpleSPFxFormProps, state: ISimpleSPFxFormState) {
        super(props);
        this.state = ({
            ID: 0,
            name: '',
            age: null,
            address: '',
            dateofBirth: null,
            gender: '',
            mobileNo: null,
        })
        // this.getAll("SimpleSPFx");
        // this.getItemById("SimpleSPFx", 5);
        // this.delete("SimpleSPFx", 5);
        //Initiating function bounds
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelectDate = this.onSelectDate.bind(this);
        this.onSelectDropdown = this.onSelectDropdown.bind(this);
        this.createItem = this.createItem.bind(this);
    }
    public render(): React.ReactElement<ISimpleSPFxFormProps> {
        return (
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <TextField label="Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    <TextField label="Age" name='age' value={String(this.state.age)} type="Number" onChange={this.handleInputChange} />
                    <DatePicker
                        label="Date of Birth"
                        className={controlClass.control}
                        placeholder="Select a date..."
                        ariaLabel="Select a date"
                        value={this.state.dateofBirth}
                        onSelectDate={this.onSelectDate}
                    />
                </Stack>
                <Stack  {...columnProps}>
                    <TextField label="Address" name='address' value={this.state.address} onChange={this.handleInputChange} />
                    <Dropdown
                        placeholder="Select an option"
                        label="Gender"
                        options={options}
                        styles={dropdownStyles}
                        selectedKey={this.state.gender}
                        onChange={this.onSelectDropdown}
                    />
                    <TextField label="Mobile No." type='number' name="mobileNo" value={String(this.state.mobileNo)} onChange={this.handleInputChange} />
                    <br />
                    <div>
                        <PrimaryButton text="Save" style={{ width: '10px', float: 'right' }} onClick={this.createItem} />
                    </div>
                </Stack>
            </Stack>
        );
    }

    //#region Events
    private handleInputChange = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    };

    private onSelectDate = (date: Date | null | undefined): void => {
        this.setState({ dateofBirth: date });
    };

    private onSelectDropdown = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        var selectedGender = item.key.toString();
        this.setState({ gender: selectedGender })
    };

    private async createItem(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {

            const data = {
                Name: this.state.name,
                Age: this.state.age,
                Address: this.state.address,
                DateofBirth: this.state.dateofBirth,
                Gender: this.state.gender,
                Mobile: this.state.mobileNo,
            };

            console.log(data);
            sp.web.lists
                .getByTitle("SimpleSPFx")//list name comes here
                .items.add(data)
                .then((results: any) => { resolve(results); console.log(results) }, (error: any) => {
                    reject("error");
                })

        });
    }
    //#endregion Events

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


}


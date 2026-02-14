import { FormFieldAction } from "./action";
import { FormFiledContainer } from "./container";
import { FormFieldContent } from "./content";
import { FormFieldCurrencyInput } from "./currencyInput";
import { FormFieldDateInput } from "./dateInput";
import { FormFieldDescription } from "./description";
import { FormFieldDropDownInput } from "./dropDownInput";
import { FormFieldGenericInput } from "./genericInput";
import { FormFieldIcon } from "./icon";
import { FormFiledLabel } from "./label";
import { FormFieldPasswordInput } from "./passwordInput";

export const FormField = {
    Container: FormFiledContainer,
    Label: FormFiledLabel,
    Content: FormFieldContent,
    Icon: FormFieldIcon,
    GenericInput: FormFieldGenericInput,
    PasswordInput: FormFieldPasswordInput,
    DateInput: FormFieldDateInput,
    CurrencyInput: FormFieldCurrencyInput,
    DropDownInput: FormFieldDropDownInput,
    Description: FormFieldDescription,
    Action: FormFieldAction
}
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Cookies from "js-cookie";
import { ContractServerService } from "../_services/contract-server.service";
import { CustomerData, CustomerType } from "../types/data/customerData";
import { MatSelectChange } from "@angular/material/select";

interface Language
{
    name: string;
    code: string;
}

@Component({
    selector: "lang-switch",
    templateUrl: "./lang-switch.component.html",
})
export class LangSwitchComponent implements OnInit
{
    public languages: readonly Language[] = [
        {name: "Deutsch", code: "de"},
        {name: "English", code: "en"},
    ] as const;

    public current: Language = this.languages[0];

    constructor(private router: Router, private route: ActivatedRoute)
    {
    }

    ngOnInit(): void
    {
        const url = document.URL;

        for (const language of this.languages)
        {
            if (!url.includes(`/${language.code}/`))
            {
                continue;
            }

            this.current = language;
            break;
        }

        console.debug("Language deduced as", this.current);
    }

    onChange(event: MatSelectChange): void
    {
        const target = window.location.href.replace(`/${this.current.code}/`, `/${event.value}/`);
        window.location.replace(target);
    }
}

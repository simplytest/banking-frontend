import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * TODO: This is horrendous.
 * From what I can tell Angular does not provide a sane built in way to switch the language (either that or its documentation is just really bad).
 * If there's a better way to do this please let me know! 
 */

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
    }

    onChange(event: MatSelectChange): void
    {
        const target = window.location.href.replace(`/${this.current.code}/`, `/${event.value}/`);
        window.location.replace(target);
    }
}

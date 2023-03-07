import {Request, Response} from "express";
import axios from "axios";
import {isValidAge, isValidString} from "./landing-validation";

export type CountryTypes = {
    name: Common;
};

export type Common = {
    common: string;
};

const axiosConfig = {
    method: 'get',
    url: 'https://restcountries.com/v3.1/region/europe',
    headers: {}
};

export function landingGet(req: Request, res: Response): void {

    let countries: any[] = []

    axios(axiosConfig)
        .then((response) => {
            response.data.forEach((item: CountryTypes) => {
                const name = item.name.common
                countries.push(name)
            })
            req.session.countries = countries;
            res.render("landing/index.njk", {
                list: countries
            });
        })
        .catch((error) => {
            console.log(error);
            // render error page?, i.e service unavailable
        });
}

export function applyPost(req: Request, res: Response): void {
    const name = req.body.name
    const age = req.body.age
    const gender = req.body.sex
    const country = req.body.sort

    if (!isValidString(name) || !isValidString(gender) || !isValidString(country) || !isValidAge(age)) {
        res.render("landing/index.njk", {
            error: "Error in request",
            list: req.session.countries
        });
        return;
    }

    const data = JSON.stringify({
        "name": name,
        "age": age,
        "sex": gender,
        "country": country
    });

    const config = {
        method: 'post',
        url: 'http://localhost:8080/api/v1/moj-digital-backend/apply',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            req.session.name = name;
            const id = response.data.id
            res.redirect("/application-complete/?id=" + id);
        })
        .catch(function (error) {
            console.log(error);
        });
}



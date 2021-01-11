<template>
    <div>
        <nav-bar />
        <div class="mainContent">
            <b-jumbotron header="Kontakt" lead="Projektgruppe">
                <p>
                    <dl>
                        <dt>Fabian Kloibhofer (Product Owner)</dt>
                        <dd><a href="mailto:fabian.kloibhofer@sz-ybbs.ac.at">fabian.kloibhofer@sz-ybbs.ac.at</a></dd>
                        <dt>Daniel Schmid (Scrum Master)</dt>
                        <dd><a href="mailto:daniel.schmid@sz-ybbs.ac.at">daniel.schmid@sz-ybbs.ac.at</a></dd>
                        <dt>Rene Rumetshofer (Developer)</dt>
                        <dd><a href="mailto:rene.rumetshofer@sz-ybbs.ac.at">rene.rumetshofer@sz-ybbs.ac.at</a></dd>
                        <dt>Alexandru Salagean (Developer)</dt>
                        <dd><a href="mailto:alexandru.salagean@sz-ybbs.ac.at">ramon-alexandru.salagean@sz-ybbs.ac.at</a></dd>
                    </dl>
                </p>
            </b-jumbotron>
        </div>
        <footer-bar />
    </div>
</template>

<script>
    import NavBar from '../components/NavBar'
    import FooterBar from '../components/Footer' 

    export default {
        components: {
            NavBar,
            FooterBar
        },
}
</script>

<style scoped>
    h1 {
        margin-top: 2em; 
    }
    dt {
        margin-top: 1em;
    }
    .jumbotron {
        background:none;
        margin: 0;
    }
</style>
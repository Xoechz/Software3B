<template>
    <div>
        <nav-bar />
            <div id="centered">
                <b-jumbotron header="Impressum">
                    <h2>Seiteninhaber</h2>    
                        <p>Schulzentrum Ybbs an der Donau</p>
                        <p>Schulring 1 und 6</p>
                        <p>3380 Ybbs an der Donau</p>
                        <p>E-Mail: <a href="mailto:martin.zeilinger@sz-ybbs.ac.at">martin.zeilinger@sz-ybbs.ac.at</a></p>
                    <hr class="my-4">
                    <h3>Inhalt und Konzept</h3>
                    <p><b>Projektteam</b></p>
                    <p>
                        <dl>
                            <dd><a href="mailto:fabian.kloibhofer@sz-ybbs.ac.at">fabian.kloibhofer@sz-ybbs.ac.at</a></dd>
                            <dd><a href="mailto:daniel.schmid@sz-ybbs.ac.at">daniel.schmid@sz-ybbs.ac.at</a></dd>
                            <dd><a href="mailto:rene.rumetshofer@sz-ybbs.ac.at">rene.rumetshofer@sz-ybbs.ac.at</a></dd>
                            <dd><a href="mailto:alexandru.salagean@sz-ybbs.ac.at">ramon-alexandru.salagean@sz-ybbs.ac.at</a></dd>
                        </dl>
                    </p>
                    <hr class="my-4">
                    <h3>Rechte</h3>
                    <p>Alle Rechte an der Webseite und den Bildern liegen beim Schulzentrum Ybbs. Das Kopieren oder die Verwendung von Fotos oder Textauszügen ist nur mit ausdrücklicher Genehmigung des Schulzentrums gestattet.</p>

                    <hr class="my-4">
                    <h3>Verweise und Links</h3>
                    <p>Bei direkten oder indirekten Verweisen auf fremde Webseiten (Hyperlinks), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt hiermit ausdrücklich, das zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten/verknüpften Seiten hat der Autor keinerlei Einfluß. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten/verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen, Linkverzeichnissen, Mailinglisten und in allen anderen Formen von Datenbanken, auf deren Inhalt externe Schreibzugriffe möglich sind. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.</p>
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
        padding: 0;
    }
    
    p {
        margin: 0;
    }
    
    #centered {
        position: relative; 
        width: 50%;
        left: 25%;
        padding-bottom: 85px;
    }
</style>
<?php
    $in = $_REQUEST;

    $in['q'] = array_key_exists('q', $in) ? $in['q'] : "NOFX";

    if (array_key_exists('q', $in)) {
        $topic = preg_replace("/\s/", "_", $in['q']);

        if ((file_exists("cache/$topic.raw")) && (!array_key_exists('f', $in))) {
            $content = file_get_contents("cache/$topic.raw");
            $out = array("content"=>array("content"=>$content), "status"=>"ok");
        } else {
            $content = file_get_contents("https://en.wikipedia.org/w/index.php?title=$topic&action=raw");

            if (!preg_match("/Wikimedia\sError/", $content)) {
                file_put_contents("cache/$topic.raw", $content);
                $out = array("content"=>array("content"=>$content), "status"=>"ok");
            } else {
                $out = array("status"=>"error", "content"=>"Error retrieving data for topic '$topic' (404?)");
            }
        }
    } else {
        $out = array("status"=>"error", "content"=>"Missing query parameter 'q'");
    }

    header("Content-type: application/json");
    print json_encode($out);

    exit;
?>

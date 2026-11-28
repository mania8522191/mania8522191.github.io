import unittest

from check_code import unused_names


class UnusedNamesTest(unittest.TestCase):
    def test_only_executable_html_counts_as_a_reference(self):
        js = {'data': 'const SHOP = {};\nfunction boot() {}\nfunction buy() {}'}
        html = '''
            <a title="SHOP">ONLINE SHOP</a>
            <script type="application/json">{"label":"SHOP"}</script>
            <script type="module">boot()</script>
            <button onclick="buy()">Buy</button>
        '''
        self.assertEqual(list(unused_names(js, html)), ['js/data.js:1: SHOP is never used'])


if __name__ == '__main__':
    unittest.main()
